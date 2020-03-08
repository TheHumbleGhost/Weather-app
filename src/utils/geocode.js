const req = require('request');

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGhlaHVtYmxlZ2hvc3QiLCJhIjoiY2sxeXNlcDJ5MG84bTNlcXR2eGo0bXl3cSJ9.LhxizMjOmHmhsr7ujdm89Q`;
    req({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Poor Internet', undefined);
        } else if (!response.body.features.length) {
            callback('Location not found', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name,
            })
        }
    })
};

module.exports = geocode;
