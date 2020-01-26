import os
import json
import redis

def get(event, context):
    city = event["pathParameters"]["city"]
    r = redis.Redis(host=os.environ["REDIS_HOST"], port=os.environ["REDIS_PORT"])

    stations = r.get('stations_' + city)

    if stations == None:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid city"})
        }

    return {
        "statusCode": 200,
        "body": stations
    }