import os
import json
import redis


def get(event, context):
    r = redis.Redis(host=os.environ["REDIS_HOST"],
                    port=os.environ["REDIS_PORT"])

    cities = r.get('cities')

    if cities is None:
        statusCode = 500
        body = json.dumps({"error": "No cities found"})
    else:
        statusCode = 200
        body = cities

    return {
        "statusCode": statusCode,
        "headers": {
            "Access-Control-Allow-Origin": os.environ["CORS_ORIGIN"],
            "Access-Control-Allow-Credentials": True
        },
        "body": body
    }
