# Caching statistic data in this repo

This is a workaround.

The goal is, to fetch the statistic data from tilda-geo.de during build.
But ATM there are performance issues which make the build fail.

The fix in TILDA will take a bit longer, so for now we cache the data in this repository and read from the file system.

We store the data as something similar to GeoJson-LD https://geojson.org/geojson-ld/ but as an array. This ways we have clean git changes whenever the data is changed.

## Run

Run manually with `npm run statistics:update`

This is also run pre-push via Husky.
