import os
import boto3
import argparse
from helpers import load_redis, check_query_result

athena = boto3.client("athena")
parser = argparse.ArgumentParser()
parser.add_argument('--city')
args = parser.parse_args()

query = """SELECT stop_id, stop_name, stop_lat, stop_lon
        FROM %s_stops
        WHERE stop_id > 40000
        AND stop_id < 60000;"""

queryStart = athena.start_query_execution(
    QueryString=(query % args.city),
    QueryExecutionContext={
        "Database": "locomotion"
    },
    ResultConfiguration={
        "OutputLocation": "s3://%s/%s/" %
        (os.environ["BUCKET_NAME"], args.city)
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

    load_redis("stations_" + args.city, parsedResults)
    print('{"success":true}')
else:
    raise "Error executing Athena query: %s" % \
        queryExecution["QueryExecution"]["Status"]["State"]
