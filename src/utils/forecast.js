const request= require('request')


const forecast=(latitude,altitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=24e5b1fb5a82b62dcc1fa7a1d5345293&query='+altitude+','+latitude
    request({url, json:true},(error, {body})=>{
        //console.log(response.body.current)
        if(error){
            callback('No se peude conectar con el servicio del clima',undefined)
        }else if(body.error){
            callback('No se puede encontrar la ubicacion',undefined)        
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'- la temperatura es: '+body.current.temperature + ', pero se siente como si hiciera: ' + body.current.feelslike)
    }})
}

module.exports=forecast 

