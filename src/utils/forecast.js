const request = require('request')


const forecast = (longitude, latitute, callback) => {
    const url = `https://api.darksky.net/forecast/34b563570c97e43e0fb6aa9bc96cb879/${longitude},${latitute}?exclude=minutely,hourly,daily,flags&units=si`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Something went wrong', null)
        } else {
            callback(null, {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
            })
        }
    })
}


module.exports = forecast