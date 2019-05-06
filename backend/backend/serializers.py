from common.models import UserMedia as Media
from common.models import UserProfile as Profile
from rest_framework import serializers

from .models import MediaModel, ProfileModel


class MediaSerializer(serializers.ModelSerializer):

    media_value = serializers.SerializerMethodField()
    engagement = serializers.SerializerMethodField()
    acquisition = serializers.SerializerMethodField()
    handle = serializers.ReadOnlyField(source='profile.handle')
    name = serializers.ReadOnlyField(source='profile.name')
    followers = serializers.IntegerField(source='profile.followers')

    def get_media_value(self, obj):
        media_score = obj.media_score
        # CALL ALGO TO ID VALUE FACTOR
        multiplier = get_factored_value(media_score)
        media_value = (media_score * multiplier)

        return '{:,.2f}'.format(media_value)

    def get_engagement(self, obj):
        engagement = obj.touch + obj.interact
        engagement = (engagement / obj.profile.followers) * 100
        return '{:.2f}'.format(engagement)

    def get_acquisition(self, obj):
        acquisition = get_factored_cpa(obj.media_value)
        return '{:,.2f}'.format(acquisition, 2)

    class Meta:
        model = MediaModel
        fields = ("__all__")


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProfileModel
        fields = ("__all__")


class DeepGetMediaSerializer(serializers.ModelSerializer):

    handle = serializers.ReadOnlyField(source='profile.handle')
    name = serializers.ReadOnlyField(source='profile.name')
    followers = serializers.ReadOnlyField(source='profile.followers')

    class Meta:
        model = Media
        fields = ("__all__")


class DeepGetProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ("__all__")
