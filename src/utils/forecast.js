const req =  require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/42a3ba72505b005edddc7bdc3eadb61c/${lat},${long}?unit=SI`;
    req({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback("Poor internet");
        } else if (body.error) {
            callback("Not able to find")
        } else {
            const summary = `${body.daily.summary} The temp is: ${body.currently.temperature}`
            callback(undefined, summary)
        }
    })
};

module.exports = forecast;