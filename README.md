# locomotion 

This application is a live view of trains currently active on major cities' mass transit systems. It features a few pretty cool concepts:

* An ETL layer that is entirely serverless and automatically processes [GTFS](https://developers.google.com/transit/gtfs) feeds to provide the static data necessary.
* A low-latency serverless API that uses Lambda and Elasticache (Redis) to serve end-user requests and not overwhelm mass transit providers' APIs with polling.
* A CDN-hosted React application that uses the Google Maps framework to visualize a combination of static and live train data to display the real time position of trains on the tracks.

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