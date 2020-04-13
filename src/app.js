// web server
const express = require('express')
// utility
const path = require('path')
// templates
const hbs = require('hbs')
// weather forecast
const geocodePkg = require('./utils/geocode')
const forecastPkg = require('./utils/forecast')

// expressjs.com
const app = express()

// port configured as environment variable in heroku
// default to 3000 if not running on heroku
const port = process.env.PORT || 3000


// config for handlebars
// define templating engine
app.set('view engine','hbs')
// change default (./views) location of templates 
const templatePath = path.join(__dirname,'../templates/views')
app.set('views', templatePath)
// partials path (page sections to include on pages)
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

// configure path to static files on web server
// for the express web server
const staticDirPath = path.join(__dirname,'../public')
app.use(express.static(staticDirPath))

// Routes:
// app.com
// app.com/help
// app.com/about

// configure how to handle the localhost homepage/route
// given a route, handle using a callback function
// index.html
//app.get('', (req, res) => {
//    res.send('Hello World')
//})

// public/help.html
// app.get('/help', (req, res) => {
//     res.send('No help available')
// })

// public/about.html
// app.get('/about', (req, res) => {
//     //res.send('Demo web server with junk')
//     res.send('<h1>About This Site</hi>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address to search for'
        })
    }
    //res.send('Weather info')
    // res.send([{
    //     forecast: 'It is snowing',
    //     location: 'Boston',
    //     address: req.query.address
    // }])
    const address = req.query.address
    geocodePkg(address, (error, {longitude, latitude, location} = {}) => {
        //console.log("lat:" + latitude + " lon:" + longitude)
        if (error) {
            return res.send({
                error: 'Geocode Error: ', error
            })
        }
        // get weather for lat/lon
        console.log("lat:" + latitude + " lon:" + longitude + " location: " + location)
        forecastPkg({longitude, latitude}, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Forecast Error: ', error
                })
            } 
            return res.send([{
                forecast: forecastData.daily,
                location,
                address
            }])
        })
        //return res.send('OK')
    })
})

// render templated homepage 
// views/index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})
// views/about.hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About something',
        name: 'Andrew'
    })
})
// views/help.hbs
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg1: 'No Help for you...'
    })
})

// test out new endpoint
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send('Please provide a search term')
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// default handler for help
app.get('/help/*', (req,res) => {
    res.render('404', {        
        title: 'Help',
        msg: 'Help article not found'
    })
})

// default handler
app.get('*', (req, res) => {
    res.render('404', {
        msg: 'HTTP 404',
    })
})

// start up server and listen on port
app.listen(port, () => {
    console.log('web server started on port ' +  port + '....')
})