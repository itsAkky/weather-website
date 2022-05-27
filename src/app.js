const path = require('path')
const hbs = require('hbs')
const express =  require('express')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine & views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//this set default directory to path provide
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>  {
    res.render('index',{
        title:"Weather",
        name:"Akky"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:"About me",
        name:"Akky"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'Akky'
    })
})

app.get('/weather',(req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error:'Please provide an address...'
        })
    }

    geocode (address,(error, {latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({error:error})
        }

        forecast(latitude,longitude,(forecastErr, forecastResponse)=> {
            if(forecastErr){
                return res.send({error:forecastErr})
            }

            res.send({
                forecast:forecastResponse,
                location,
                address:address
            })
        })

    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        'name':'Akky',
        'errorMessage':'Help Article Not Found...!'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        'name':'Akky',
        'errorMessage':'Page Not Found...!'
    })
})



app.listen(3000,() => {
    console.log('Web server is up on port 3000...')
})