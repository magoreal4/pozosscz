
from django.contrib import admin
from django.urls import path, include

from config import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns



urlpatterns = [
    path('grappelli/', include('grappelli.urls')), # grappelli URLS
    path('admin/', admin.site.urls, name='Admin'),
    path('', include('main.urls')),
    path('mapa/', include('mapa.urls')),
    path('contact/', include('fcontact.urls')),
    # path("django-check-seo/", include("django_check_seo.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += staticfiles_urlpatterns()