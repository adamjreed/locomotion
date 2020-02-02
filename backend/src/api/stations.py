import os
import json
import redis


def get(event, context):
    city = event["pathParameters"]["city_id"]
    r = redis.Redis(host=os.environ["REDIS_HOST"],
                    port=os.environ["REDIS_PORT"])

    stations = r.get('stations_' + city)

    if stations is None:
        statusCode = 400
        body = json.dumps({"error": "Invalid city"})
    else:
        statusCode = 200
        body = stations

    return {
        "statusCode": statusCode,
        "headers": {
            "Access-Control-Allow-Origin": os.environ["CORS_ORIGIN"],
            "Access-Control-Allow-Credentials": True
        },
        "body": body
    }
