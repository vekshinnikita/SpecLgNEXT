from django.db import models

from core.models import BasicPost
from backend.settings import URL_HOST

# Create your models here.
class Services(BasicPost):
    summary = models.TextField('Краткое содержание',help_text="Нужно заполнять если выбран пункт 'На главной странице'.")
    display_on_main = models.BooleanField("На главной странице",default=False)
    image = models.ImageField("Изображение", upload_to="services/", blank=True, null=True)

    def __str__(self):
        return self.title 

    def service_image(self):
        try:
            return URL_HOST + self.image.url
        except:
            return None

    
    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"
