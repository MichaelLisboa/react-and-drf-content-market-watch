from django.conf.urls import url
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter()
router.register(r'media', views.MediaViewSet)
router.register(r'i', views.ProfileViewSet)
urlpatterns = router.urls

urlpatterns += [
    url(
        r'media/(?P<pk>\d+)/$',
        views.MediaItem.as_view(),
        name='media-item'
    ),
    url(
        r'media/deep-get/(?P<pk>\d+)/$',
        views.DeepGetMediaItem.as_view(),
        name='deep-get-media'
    ),
    url(
        r'i/deep-get/(?P<handle>[-\w.!]+)/$',
        views.DeepGetProfile.as_view(),
        name='deep-get-media'
    ),
    url(
        r'media/latest-by-profile/(?P<handle>[-\w.!]+)/$',
        views.LatestByProfile.as_view(),
        name='latest-by-profile'
    ),
    url(
        r'media/latest-by-media-value(?:/(?P<period>\d+))?/$',
        views.LatestByMediaValue.as_view(),
        name='latest-by-media-value'
    ),
]
