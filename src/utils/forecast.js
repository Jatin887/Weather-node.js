const request = require('postman-request')
const forecast = (latitude,longtitude,callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=900e2df8f3132e44e3a640753339aede&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longtitude)+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error) {
            callback('Unable to connect weather services :(',undefined)
        }else if(body.error){
            callback('Unable to find coodinates :(',undefined)
        }
        else {
            callback(undefined,'Its ' + body.current.weather_descriptions[0] + ' Today ' +' The temprature of '+ body.location.name+' is '+body.current.temperature+' and the chances of rain are  '+body.current.precip+'%' + ' Wind Speed is '+body.current.wind_speed+' and humidity percentage is ' + body.current.humidity);
        }
    })
}
module.exports = forecast