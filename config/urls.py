
from django.contrib import admin
from django.urls import path, include

from config import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.contrib.sitemaps.views import sitemap
from .sitemaps import StaticSitemap

from django.views.generic.base import TemplateView

sitemaps = {
    'static': StaticSitemap,
}

urlpatterns = [
    path('grappelli/', include('grappelli.urls')), # grappelli URLS
    path('admin/', admin.site.urls, name='Admin'),
    path('', include('main.urls')),
    path('mapa/', include('mapa.urls')),
    path('contact/', include('fcontact.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path("robots.txt", TemplateView.as_view(template_name="robots.txt", content_type="text/plain"))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += staticfiles_urlpatterns()