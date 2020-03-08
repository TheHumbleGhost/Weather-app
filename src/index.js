const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

let app = new express();

const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Jai"
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Jai"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help section",
        name: "Jai"
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address.",
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastResponse) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location: place_name,
                forcast: forecastResponse,
                address: req.query.address,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error page",
        errorContent: "Help article not found",
        name: "Jaideep"
    })
});

app.get('*', (req, res) => {
    res.render('error', {
        title: "Error page",
        errorContent: "Page not found",
        name: "Jaideep"
    })
});

app.listen(3000, () => {
    console.log("Server is up");
});