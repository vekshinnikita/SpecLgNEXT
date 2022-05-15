from django import forms
from django.contrib import admin

from services.models import Services

# Register your models here.

from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.utils.safestring import mark_safe

class ServicesAdminForm(forms.ModelForm):
    description = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())
    
    class Meta:
        model = Services
        fields = "__all__"




@admin.register(Services)
class ServicesAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug','display_on_main')
    save_on_top = True
    form = ServicesAdminForm
    readonly_fields = ("get_image",)
    fieldsets = (
        (None, {
            "fields": ("title", 'slug',)
        }),
        (None, {
            "fields": ("summary",('image', 'get_image'))
        }),
        (None, {
            "fields": ("description",)
        }),
        ("Options", {
            "fields": ("display_on_main",)
        }),
    )

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url}  height="110"')