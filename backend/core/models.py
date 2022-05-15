from django.db import models

# Create your models here.
class BasicPost(models.Model):
    title = models.CharField('Название' ,max_length=150)
    description = models.TextField("Описание", null=True, blank=True)
    slug = models.SlugField(max_length=100)

    class Meta:
        abstract = True
