// forecast.js
//
// Given a lat/lon location, call a weather web service and return:
//  - currently conditions
//  - daily summary
//
// Example URL:
//   https://api.darksky.net/forecast/363b6427c6097f21ed6ac78389b8e728/37.8267,-122.4233
//
const requestPkg = require('request')

// Get forecast for lat/lon location
// Will no longer be availabe after 2021 (or before)
// after bought out by Apple
const forecast = ({longitude, latitude}, callback) => {
    //console.log("lat:" + latitude + " lon:" + longitude)
    if (!longitude || !latitude) {
        callback('Please specifiy a latitude and longitude location')
    }
    const darkskyURL = 'https://api.darksky.net/forecast/363b6427c6097f21ed6ac78389b8e728/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=us'
    console.log(darkskyURL)
    requestPkg( {url: darkskyURL, json: true}, (error, {body: respBody}) => {
        //console.log(respBody)
        if (error) {
            callback('Unable to connect to weather service')
        } else if (!respBody) {
            callback('Request failed, try another search')
        }
        else if (!respBody.currently) {
            callback('Request missing current data, try another search')
        }
        else if (respBody.currently.length === 0) {
            callback('Unable to find weather for location, try another search')
        } else {
            callback(undefined, {
                currently: respBody.currently,
                daily: respBody.daily.data[0].summary,
                dailyHigh: respBody.daily.data[0].temperatureHigh,
                dailyLow: respBody.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = forecast