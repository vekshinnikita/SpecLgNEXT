from PIL import Image
from django.db import models
from backend.settings import URL_HOST
from core.models import BasicPost

# Create your models here.
class WorkTag(models.Model):
    name = models.CharField('Тэг',max_length=150)

    class Meta:
        verbose_name = "Тэг"
        verbose_name_plural = "Тэги"

    def __str__(self):
        return self.name 

class Work(BasicPost):
    summary = models.TextField('Краткое содержание')
    draft = models.BooleanField("Черновик",default=False)
    date = models.CharField('Месяц и год', max_length=150, null=True)
    tags = models.ManyToManyField(WorkTag)

    def __str__(self):
        return self.title 

    
    class Meta:
        verbose_name = "Выполненные заказы"
        verbose_name_plural = "Выполненные заказы"
    
class WorkShots(models.Model):
    image = models.ImageField("Изображение", upload_to="completed_work/")
    product = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="shots")

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"
    
    def url_image(self):
        return URL_HOST + self.image.url
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        height, width = img.size
        img = img.resize((height,width), Image.ANTIALIAS)
        self.image = img.save(self.image.path)




