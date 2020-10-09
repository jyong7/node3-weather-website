const request =require('request')
const geocode= (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoianlvbmciLCJhIjoiY2tmenhmYmI3MDF5ajJ0cGltcGc2cGUwcSJ9.G41yefMJ6A43ck1PIbG4mg&limit=1'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('NO se peude conectar con el servicio geo',undefined)
        }else if(body.features.length === 0){
            callback('No se puede encontrar la ciudad',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode