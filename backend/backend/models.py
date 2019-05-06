from django.db import models
from django.contrib.postgres.fields import JSONField


class ProfileModel(models.Model):
    name = models.CharField(max_length=255)
    ig_handle = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(max_length=255, blank=True)
    link = models.CharField(max_length=255, blank=True)
    followers = models.IntegerField(default=0)
    profile_pic = models.CharField(max_length=255, blank=True)

    class Meta:
        managed = False
        db_table = 'UserProfile'


class MediaModel(models.Model):
    profile = models.ForeignKey(ProfileModel, on_delete=None)
    pixt_img = models.CharField(max_length=255)
    tag_list = models.TextField(blank=True)
    media_score = models.IntegerField(default=0)
    touch = models.IntegerField(default=0)
    interact = models.IntegerField(default=0)
    timestamp = models.DateTimeField(blank=True, null=True)
    uid = models.CharField(max_length=255, blank=True)
    media_values = JSONField(blank=True, null=True)
    media_data = JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'UserMedia'
