import jwt
from datetime import datetime, timedelta
from django.conf import settings

SECRET_KEY = "asdf"
JWT_EXPIRATION_DELTA = timedelta(days=1)

def generate_jwt(user):
    payload = {
        "user_id": user.id,
        "email": user.email,
        "exp": datetime.utcnow() + JWT_EXPIRATION_DELTA,
        "iat": datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def decode_jwt(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
