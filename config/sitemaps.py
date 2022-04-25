from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class Site:
    domain = 'pozosscz.com'

class StaticSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.8
    protocol = 'https'
    
    def items(self):
        return ['main_app:Home', 'mapa_app:Mapa', 'mapa_app:Mapa-Admin', 'fcontact_app:ContactForm']

    def get_urls(self, site=None, **kwargs):
        site = Site()
        return super(StaticSitemap, self).get_urls(site=site, **kwargs)

    def location(self, item):
        return reverse(item)