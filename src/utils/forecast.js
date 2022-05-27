const request = require('request')

//here we have used Object destructuring (example response.body to just body) & property Shorthand (example json:json to just json)
const forecast = (lat,long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52a21004603118541e628fa7518378a4&query='+lat+','+long
    request({url, json:true}, (error,{ body } = {}) => { 
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions+'. Current temperature in '+ body.location.name+' is '+ body.current.temperature+ ' °C degrees, but it feels like '+ body.current.feelslike +' °C degrees. Current humidity is '+body.current.humidity+'% and wind speed is '+body.current.wind_speed)
        }
    })
}

module.exports = forecast
