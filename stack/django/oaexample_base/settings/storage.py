import os
from .base import *
from urllib.parse import urlparse
import logging
logger = logging.getLogger(__name__)

APP_HOST = os.getenv('REACT_APP_APP_HOST', 'https://localhost.oaexample.com:3000')
APP_HOST_PARTS = urlparse(APP_HOST)
API_HOST = os.getenv('REACT_APP_API_HOST', 'https://localapi.oaexample.com:8080')
API_HOST_PARTS = urlparse(API_HOST)

OA_ENV_STORAGE = os.getenv("OA_ENV_STORAGE", "local")
print(f"STORAGE USING: {OA_ENV_STORAGE} ")

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(PROJECT_DIR)

STORAGES = {
        "default": {
            "BACKEND": "django.core.files.storage.FileSystemStorage",
        },
        # ManifestStaticFilesStorage is recommended in production, to prevent
        # outdated JavaScript / CSS assets being served from cache
        # (e.g. after a Wagtail upgrade).
        # See https://docs.djangoproject.com/en/4.2/ref/contrib/staticfiles/#manifeststaticfilesstorage
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.ManifestStaticFilesStorage",
        },
    }

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, 'static'),
]

if OA_ENV_STORAGE == 'gcp':
    from google.oauth2 import service_account

    GS_CREDENTIALS_PATH = myEnv('GCP_SA_KEY_PATH')
    if os.path.isdir(GS_CREDENTIALS_PATH):
        GS_CREDENTIALS = service_account.Credentials.from_service_account_file(GS_CREDENTIALS_PATH)
    else:
        logger.warning('Google Service credentials should be set in Secret Manager')

    GS_FILE_OVERWRITE = False
    GS_BUCKET_NAME = sanitize_bucket_name(myEnv('GCP_BUCKET_API_NAME', 'oaexample-media'))

    DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
    STATICFILES_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
    GS_DEFAULT_ACL = "publicRead"

    STATIC_URL = f'https://storage.googleapis.com/{GS_BUCKET_NAME}/static/'
    MEDIA_URL = f'https://storage.googleapis.com/{GS_BUCKET_NAME}/media/'
else:
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATIC_URL = '/static/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    MEDIA_URL = '/media/'
