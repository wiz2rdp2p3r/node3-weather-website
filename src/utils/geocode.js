// geocode.js
//
// Given an address, call a web service and return:
//  - longitude
//  - latitude
//  - address proper name
//
const requestPkg = require('request')

// http request for lat/lon of given address
const geocode = (address, callback) => {
    if (!address) {
        callback('Please specifiy an address to search')
    }
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHVzdDJ3aW5kb3ciLCJhIjoiY2p6Z3kzMHJxMHIydDNjbzZrNjA1bXRjNCJ9.CtG1NNYBpxeZKOLIE14sXg&llimit=1'
    console.log(mapBoxUrl)
    requestPkg( {url: mapBoxUrl, json: true}, (error, {body: respBody}) => {
        if (error) {
            callback('Unable to connect to location service')
        } else if (respBody.features.length === 0) {
            callback('Unable to find location, try another search')
        } else {
            //console.log(respBody.features[0])
            callback(undefined, {
                longitude: respBody.features[0].center[0],
                latitude: respBody.features[0].center[1],
                location: respBody.features[0].place_name
            })
        }
    })
}

module.exports = geocode