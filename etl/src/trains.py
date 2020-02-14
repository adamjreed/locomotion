from trains import chicago
from helpers import load_redis
import sched
import time
import argparse

s = sched.scheduler(time.time, time.sleep)
parser = argparse.ArgumentParser()

parser.add_argument('--city')
parser.add_argument('--apiKey')
args = parser.parse_args()


def load_cities(client):
    s.enter(10, 1, load_cities, (client,))
    trains = client.get(args.apiKey)
    load_redis("trains_" + args.city, trains)
    print('{"success":true}')


def get_client(city):
    cities = {
        "chicago": chicago
    }

    return cities.get(city)


client = get_client(args.city)

if client is None:
    raise "Invalid city"

s.enter(0, 1, load_cities, (client,))
s.run()
