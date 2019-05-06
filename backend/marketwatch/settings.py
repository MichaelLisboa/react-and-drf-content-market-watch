import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = False

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'backend.apps.BackendConfig',

    # 3rd party
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'marketwatch.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'marketwatch.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Singapore'
USE_I18N = True
USE_L10N = True
USE_TZ = True


STATIC_URL = '/static/'

CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = ('*')

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': (
        'rest_framework.pagination.LimitOffsetPagination'
    ),
    'PAGE_SIZE': 25,
    'DEFAULT_METADATA_CLASS': (
        'rest_framework.metadata.SimpleMetadata'
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day'
    }
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'PORT': '5432',
        'CONN_MAX_AGE': 60 * 10,
    }
}

if os.getenv('GAE_INSTANCE'):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    DATABASES['default']['HOST'] = ('*')
    DATABASES['default']['NAME'] = os.environ.get('DB_NAME')
    DATABASES['default']['USER'] = os.environ.get('DB_USER')
    DATABASES['default']['PASSWORD'] = os.environ.get('DB_PASS')

    STATIC_URL = '*'
    STATIC_ROOT = 'static/'
else:

    with open('bin/connections.json') as f:
        data = json.load(f)

    SECRET_KEY = data['secret_key']

    DEBUG = True
    DATABASES['default']['HOST'] = '127.0.0.1'
    DATABASES['default']['NAME'] = data['db_name']
    DATABASES['default']['USER'] = data['db_user']
    DATABASES['default']['PASSWORD'] = data['db_pass']

    EMAIL_HOST = data['email_host']
    EMAIL_HOST_USER = data['email_user']
    DEFAULT_FROM_EMAIL = data['email_user']
    SERVER_EMAIL = data['email_user']
    EMAIL_HOST_PASSWORD = data['email_pass']
