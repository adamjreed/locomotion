import os
import boto3
import json
import redis

def handler(event, context):
    athena = boto3.client("athena")
    r = redis.Redis(host=os.environ["REDIS_HOST"], port=os.environ["REDIS_PORT"])

    queryStart = athena.start_query_execution(
        QueryString = "SELECT stop_id, stop_name, stop_lat, stop_lon FROM chicago_stops where stop_id > 40000 and stop_id < 60000;",
        QueryExecutionContext = {
            "Database": "locomotion"
        },
        ResultConfiguration = {
            "OutputLocation": "s3://" + os.environ["BUCKET_NAME"] + "/" + event["city"] + "/"
        }
    )

    print(queryStart)

    finalState = False

    while finalState != True:
        queryExecution = athena.get_query_execution(
            QueryExecutionId = queryStart["QueryExecutionId"]
        )

        finalState = check_query_result(queryExecution["QueryExecution"]["Status"]["State"])

    if queryExecution["QueryExecution"]["Status"]["State"] == "SUCCEEDED":
        queryResults = athena.get_query_results(
            QueryExecutionId = queryStart["QueryExecutionId"]
        )
        headers = None
        parsedResults = []
        for stop in queryResults["ResultSet"]["Rows"]:
            if headers == None:
                headers = []
                for value in stop["Data"]:
                    headers.append(value["VarCharValue"])
            else:
                i = 0
                row = {}
                for value in stop["Data"]:
                    row[headers[i]] = value["VarCharValue"]
                    i+=1
                parsedResults.append(row)

        return r.set("stations_" + event["city"],json.dumps(parsedResults))

    return "Error executing Athena query: " + queryExecution["QueryExecution"]["Status"]["State"]

def check_query_result(status):
    possible_statuses = {
        "QUEUED": False,
        "RUNNING": False,
        "SUCCEEDED": True,
        "FAILED": True,
        "CANCELLED": True,
    }

    return possible_statuses.get(status, False)