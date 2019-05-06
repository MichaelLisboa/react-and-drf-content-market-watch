import os
from datetime import datetime, timedelta

import pytz
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

import bmemcached
import requests
from common.models import UserMedia as Media
from common.models import UserProfile as Profile
from rest_framework import generics, mixins, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MediaModel, ProfileModel
from .serializers import (DeepGetMediaSerializer, DeepGetProfileSerializer,
                          MediaSerializer, ProfileSerializer)

User = get_user_model()
MEMCACHE_SERVER = os.environ.get('MEMCACHE_SERVER', 'localhost:11211')
MEMCACHE_USERNAME = os.environ.get('MEMCACHE_USERNAME')
MEMCACHE_PASSWORD = os.environ.get('MEMCACHE_PASSWORD')
mc_client = bmemcached.Client(
    MEMCACHE_SERVER,
    username=MEMCACHE_USERNAME,
    password=MEMCACHE_PASSWORD
)
mc_client.enable_retry_delay(True)


class MediaViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):

    queryset = (
        MediaModel
        .objects
        .all()
        .filter(profile__followers__lte=50000000)
        .prefetch_related('profile')
        .order_by("-timestamp")
    )[:100]

    serializer_class = MediaSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ProfileViewSet(mixins.ListModelMixin,
                     viewsets.GenericViewSet):

    queryset = ProfileModel.objects.all().order_by('-id')

    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)


class DeepGetMediaItem(APIView):

    def get(self, request, pk, format=None, **kwargs):
        media = get_object_or_404(Media, pk=pk)
        serializer = DeepGetMediaSerializer(media)

        return Response(serializer.data)

    def patch(self, request, pk, format=None, **kwargs):
        pass


class DeepGetProfile(APIView):

    lookup_field = 'handle'
    extra_kwargs = {
        'url': {'lookup_field': 'handle'}
    }

    def get(self, request, handle, format=None, **kwargs):
        profile = get_object_or_404(Profile, handle=handle)
        serializer = DeepGetProfileSerializer(profile)

        return Response(serializer.data)


class LatestByProfile(generics.ListAPIView):

    serializer_class = MediaSerializer
    lookup_field = 'handle'
    extra_kwargs = {
        'url': {'lookup_field': 'handle'}
    }

    def get_queryset(self, handle=None):
        handle = self.kwargs['handle']
        return (
            MediaModel
            .objects
            .filter(
                profile__handle=handle
            )
            .order_by("-timestamp"))[:20]


class LatestByMediaValue(generics.ListAPIView):

    serializer_class = MediaSerializer
    lookup_field = 'period'
    extra_kwargs = {
        'url': {'lookup_field': 'period'}
    }

    def get_queryset(self, period=None):
        period = int(self.kwargs['period']) if self.kwargs['period'] else 168
        right_now = datetime.utcnow().replace(tzinfo=pytz.utc)
        hours = right_now - timedelta(hours=period)
        return (
            MediaModel
            .objects
            .all()
            .filter(
                timestamp__gte=hours,
                profile__followers__lte=10000000
            )
            .order_by("-media_score", "-timestamp")
        )[:100]


class MediaItem(generics.RetrieveAPIView):

    queryset = (
        MediaModel
        .objects
        .all()
        .filter(profile__followers__lte=50000000)
    )
    serializer_class = MediaSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):

        if mc_client.get(f"{kwargs['pk']}_media"):
            post = mc_client.get(f"{kwargs['pk']}_media")
        else:
            obj = get_object_or_404(MediaModel, pk=kwargs['pk'])
            post = MediaSerializer(obj).data
            r = requests.get(os.environ.get('REQUEST_PATH'))

            if r.ok:
                try:
                    media = r.json()['graphql']
                    interact = (media['interact']['count']
                                if media['interact'] else 0)
                    touch = (media['touch']['count']
                             if media['touch'] else 0)

                    media_score = obj.media_score
                    engagement = obj.touch + obj.interact
                    engagement = (engagement / obj.profile.followers) * 100
                    # CALL ALGO TO ID VALUE FACTOR
                    multiplier = get_factored_value(media_score)
                    media_value = (media_score * multiplier)

                    return '{:,.2f}'.format(media_value)

                    cost_per_post = post.get('followers') / 1000
                    acquisition = cost_per_post / (interact + touch)

                    post.update({
                        "engagement": '{:.2f}'.format(engagement),
                        "acquisition": '{:.2f}'.format(acquisition),
                        "media_value": '{:.2f}'.format(media_value),
                        "edge_touch": touch,
                        "edge_interact": interact
                    })

                    mc_client.set(
                        f"{kwargs['pk']}_media",
                        {**post},
                        time=45,
                        compress_level=5
                    )

                    if (interact != obj.edge_interact or
                            touch != obj.edge_touch):
                        obj.edge_interact = interact
                        obj.edge_touch = touch
                        obj.save()
                except (KeyError, ValueError):
                    pass

        return Response(post)
