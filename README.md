# locomotion 

This application is a live view of trains currently active on major cities' mass transit systems. It is intended to serve as a demo of 
how you can harness the power of serverless applications and simple single-page-app frontends to quickly visualize interesting data sets. A few things of note about the architecture:

* The ETL layer is all automatic and can be run via crons and expanded by only entering new resources to fetch.
* Apart from the Redis instance, the entire application is only billed when things are in flight. If there are no users and no data is being actively ingested or transformed, the app has virtually zero cost.
* The frontend being on a CDN and the backend using Elasticache means that this is rapidly scalable to large amounts of traffic.

## Components
The application has 3 fundamental components:

### ETL
The bedrock of the application is a serverless ETL layer that uses Lambda functions to fetch static GTFS transit data from mass transit systems (see more on GTFS [here](https://developers.google.com/transit/gtfs)) and transform it using Amazon Glue and Athena. Once transformed, the data is periodically updated in a Redis server which is queried by the backend API.

### API
The API layer provides a set of common endpoints for the frontend to call, which then translate to both static data from Redis and dynamic data from live APIs hosted by mass transit systems.

### Frontend
The frontend layer is a React application that presents an interactive map to the user displaying all active trains for a given region.

## TODO
This application is in a very early state and obviously has a lot of future potential. 

MVP:
- [x] Fetch GTFS feed and store in S3
- [x] Only download new files if they've been modified on the server
- [x] Load static files into Glue catalog
- [x] Transform information we need (stations primarily but eventually probably shapes too) and store in Elasticache (Redis) as json
- [ ] Build API for stations and live data
- [x] React app to display a map
- [ ] Show stations on map
- [ ] Allow selection of cities dynamically
- [ ] Render trains from live results
- [ ] Animate trains on map

These are things that need to be done in order to reach what I'd consider a production-ready app:
- [ ] App hosted on CDN
- [ ] DNS for app and api
- [ ] Error handling and reliability across the board (monitoring, retries, redundant nodes, etc)
- [ ] Unit and integration tests
- [ ] CI
- [ ] Better state management (probably Redux) on the frontend

Here are a few features I'd like to add over time:
- [ ] More cities (just Chicago for now because their [developer resources](https://www.transitchicago.com/developers/) are awesome)
- [ ] Interactivity on stations and trains. Show upcoming trains for stations and show station estimates for trains.
- [ ] Reliability tracking on transit systems. Instead of just passing info to frontend, API saves it in a database and can report metrics like percentage of on-time arrivals per station, line, run, etc.