import argparse
from helpers import load_redis, query_athena

parser = argparse.ArgumentParser()
parser.add_argument('--city')
args = parser.parse_args()

query = """
    SELECT stop_id, stop_name, stop_lat, stop_lon
    FROM %s_stops
    WHERE stop_id > 40000
    AND stop_id < 60000;
""" % (args.city)

load_redis("stations_" + args.city, query_athena(query))
print('{"success":true}')
