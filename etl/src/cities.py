from helpers import load_redis

load_redis('cities', [{
    "id": "chicago",
    "name": "Chicago",
    "lat": 41.8798064,
    "lng": -87.6478534,
    "zoom": 12
}])

print('{"success":true}')
