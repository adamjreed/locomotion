import os
import redis
import json


def load_redis(key, content):
    r = redis.Redis(host=os.environ["REDIS_HOST"],
                    port=os.environ["REDIS_PORT"])

    return r.set(key, json.dumps(content))


def check_query_result(status):
    possible_statuses = {
        "QUEUED": False,
        "RUNNING": False,
        "SUCCEEDED": True,
        "FAILED": True,
        "CANCELLED": True,
    }

    return possible_statuses.get(status, False)
