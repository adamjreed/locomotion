import os
import json
import redis

def get(event, context):
    r = redis.Redis(host=os.environ["REDIS_HOST"], port=os.environ["REDIS_PORT"])

    cities = r.get('cities')

    if cities == None:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "No cities found"})
        }

    return {
        "statusCode": 200,
        "body": cities
    }