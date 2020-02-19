from helpers import load_redis, query_athena

chicago_routes_query = """
    SELECT route_id, route_color
    FROM chicago_routes
    WHERE route_type = 1;
"""

chicago_routes = query_athena(chicago_routes_query)

load_redis('cities', [{
    "id": "chicago",
    "name": "Chicago",
    "lat": 41.8798064,
    "lng": -87.6478534,
    "zoom": 12,
    "routes": chicago_routes
}])

print('{"success":true}')
