from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.utils.safestring import mark_safe

from .models import Work, WorkShots, WorkTag

# Register your models here.

class WorkAdminForm(forms.ModelForm):
    description = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())
    
    class Meta:
        model = Work
        fields = "__all__"


class MovieShotsInline(admin.TabularInline):
    model = WorkShots
    extra = 1
    readonly_fields = ("get_image",)

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} height="110"')


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = ('title',"draft",)
    list_filter = ('title','tags')
    inlines = [MovieShotsInline]
    form = WorkAdminForm
    save_on_top = True
    fieldsets = (
        (None, {
            "fields": ("title", 'slug','date','tags')
        }),
        (None, {
            "fields": ("summary",)
        }),
        (None, {
            "fields": ("description",)
        }),
        ("Options", {
            "fields": ("draft",)
        }),
    )

@admin.register(WorkTag)
class WorkTagAdmin(admin.ModelAdmin):
    list_display = ('name',)