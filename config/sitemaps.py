from django.contrib.sitemaps import Sitemap
from django.urls import reverse

# class Site:
#     domain = 'pozosscz.com'

# class MainSitemap(Sitemap):
#     location = "/"
#     changefreq = "monthly"
#     priority = 1

#     def get_urls(self, site=None, **kwargs):
#         site = Site()
#         return super(MainSitemap, self).get_urls(site=site, **kwargs)


#     def items(self):
#       return [self]

class StaticSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.8
    protocol = 'https'
    
    def items(self):
        return ['main_app:Home', 'mapa_app:Mapa']

    # def get_urls(self, site=None, **kwargs):
    #     site = Site()
    #     return super(StaticSitemap, self).get_urls(site=site, **kwargs)

    def location(self, item):
        return reverse(item)