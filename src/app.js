const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))



app.get('/', (req, res) => {
    const data = {
        title: 'Home',
        name: 'Nawaz',
        age: 27
    }

    res.render('index', data)
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (geoodeError, { longitude, latitute, location }) => {
        if (geoodeError) {
            return res.send(geoodeError)
        }

        forecast(longitude, latitute, (forecastError, data) => {
            if (forecastError) {
                return res.send(forecastError)
            }

            res.send({
                address: req.query.address,
                longitude,
                latitute,
                location
            })
        })
    })

})

app.get('*', (req, res) => {
    res.send('<h1>404 | Page not found</h1>')
})



app.listen(3000, () => {
    console.log('Server is running')
})