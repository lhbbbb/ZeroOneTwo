from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=20, blank=True, null=True)
    active = models.IntegerField(default=1)
    regdate = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    sleepdate = models.DateTimeField(blank=True, null=True)
    withdrawdate = models.DateTimeField(blank=True, null=True)
    custom_password = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username


class Boards(models.Model):
    board_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    startdate = models.DateField(blank=True, null=True)
    enddate = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    register = models.ForeignKey('User', models.DO_NOTHING, db_column='register', related_name='board_register', blank=True, null=True)
    regdate = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    entry = models.ManyToManyField(User, related_name='boards', blank=True, null=True)

    def __str__(self):
        return self.title


class Items(models.Model):
    item_id = models.AutoField(primary_key=True)
    receipt = models.ForeignKey('Receipts', models.DO_NOTHING, blank=True, null=True)
    origin_name = models.CharField(max_length=50, blank=True, null=True)
    trans_name = models.CharField(max_length=50, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    units = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.origin_name


class Rate(models.Model):
    rate_id = models.AutoField(primary_key=True)
    date = models.DateField()
    usa = models.FloatField(blank=True, null=True)
    jpa = models.FloatField(blank=True, null=True)
    cha = models.FloatField(blank=True, null=True)
    way = models.CharField(max_length=20, blank=True, null=True)
    register = models.ForeignKey('User', models.DO_NOTHING, db_column='register')
    regdate = models.DateTimeField(blank=True, null=True)


class Receipts(models.Model):
    receipt_id = models.AutoField(primary_key=True)
    date = models.DateTimeField(blank=True, null=True)
    place = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    telephone = models.CharField(max_length=30, blank=True, null=True)
    register = models.ForeignKey('User', models.DO_NOTHING, db_column='register', blank=True, null=True)
    regdate = models.DateTimeField(blank=True, null=True)
    board = models.ForeignKey(Boards, models.DO_NOTHING, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    currency = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to='images')
    total = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.place
