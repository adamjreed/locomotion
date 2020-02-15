import os
import redis
import json
import boto3


def load_redis(key, content):
    r = redis.Redis(host=os.environ["REDIS_HOST"],
                    port=os.environ["REDIS_PORT"])

    return r.set(key, json.dumps(content))


def query_athena(query):
    athena = boto3.client("athena")

    queryStart = athena.start_query_execution(
        QueryString=query,
        QueryExecutionContext={
            "Database": "locomotion"
        },
        ResultConfiguration={
            "OutputLocation": "s3://%s/%s/" %
            (os.environ["BUCKET_NAME"], "athena_result")
        }
    )

    finalState = False

    while finalState is not True:
        queryExecution = athena.get_query_execution(
            QueryExecutionId=queryStart["QueryExecutionId"]
        )

        finalState = check_query_result(
            queryExecution["QueryExecution"]["Status"]["State"]
        )

    if queryExecution["QueryExecution"]["Status"]["State"] == "SUCCEEDED":
        queryResults = athena.get_query_results(
            QueryExecutionId=queryStart["QueryExecutionId"]
        )
        headers = None
        parsedResults = []
        for stop in queryResults["ResultSet"]["Rows"]:
            if headers is None:
                headers = []
                for value in stop["Data"]:
                    headers.append(value["VarCharValue"])
            else:
                i = 0
                row = {}
                for value in stop["Data"]:
                    row[headers[i]] = value["VarCharValue"]
                    i += 1
                parsedResults.append(row)
        return parsedResults
    else:
        raise "Error executing Athena query: %s" % \
            queryExecution["QueryExecution"]["Status"]["State"]


def check_query_result(status):
    possible_statuses = {
        "QUEUED": False,
        "RUNNING": False,
        "SUCCEEDED": True,
        "FAILED": True,
        "CANCELLED": True,
    }

    return possible_statuses.get(status, False)
