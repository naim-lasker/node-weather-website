const request = require('request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoibmFpbWxhc2tlciIsImEiOiJjazdoZnU5MHowNW5oM2xwM3IwNzdlamdzIn0.FKkGr7RmjzNZTOF8XRX4gg&limit=1`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to locarion services!', null)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', null)
        } else {
            callback(null, {
                longitude: body.features[0].center[0],
                latitute: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}


module.exports = geocode