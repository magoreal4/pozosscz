# django-skeleton

## Virtual environment and packages

```shell
python3 -m venv env
source env/bin/activate
```

#### requirements.txt

```textile
Django==4.0.3
django-livereload-server==0.4
gunicorn==20.1.0
```

```shell
pip install -r requirements.txt
pip freeze
pip freeze> requirements.txt
pip uninstall -r requirements.txt -y
```

## Start Project

```shell
django-admin startproject mainConfig .
python manage.py migrate
python manage.py createsuperuser
```

## Start a New app

```shell
python manage.py startapp main
```

#### config: setting.py

```python
import os
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main.apps.MainConfig'
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

LANGUAGE_CODE = 'es-bo'

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'), ]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
```

#### config: urls.py

```python
from django.contrib import admin
from django.urls import path, include

from config import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

#### main: urls.py (create file)

```python
from django.urls import path
from main import views

urlpatterns = [
    path('', views.Home.as_view(), name='Home'),
]
```

#### main: views.py

```python
from django.shortcuts import render
from django.views.generic import TemplateView

class Home(TemplateView):
    template_name = "home.html"
```

#### Django Runserver

```shell
python manage.py runserver 8888
```

## Live Reload

```shell
pip install django-livereload-server
```

#### config: setting.py

```python
DEBUG = True

INSTALLED_APPS = (
    '...',
    'livereload',
    'django.contrib.staticfiles',
    '...',
)

MIDDLEWARE = [
    '...',
    'livereload.middleware.LiveReloadScript',
]


```

#### Django Runserver

Two diferents terminal

```shell
python manage.py livereload
python manage.py runserver
```

