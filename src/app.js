const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
 
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:"Weather App",
        name: "James Yong"
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: "Sobre nosotros",
        name: "James Yong"
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: "Aiuda",
        name: "James Yong"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'TIenes que poner una ubicacion'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} ={}) => {
        if (error) {
            return res.send({error})
        }
        debugger
        const ubica=location
        forecast(longitude, latitude, (error, forecastData) => {
            debugger
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: location
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'No se encontro lo solocitado'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404',{
        title: '404',
        typeError: 'articulo help no encontrado'
    })
})

app.get('*', (req, res)=> {
    res.render('404',{
        title:'404',
        typeError: 'Pagina no encontrada'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})