const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gecode = require('./utils/gecode')
const forecast = require('./utils/forecast')
const { title } = require('process')

console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handelbasrs engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
// Setup ststic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        page_title:'Weather App',
        title:'Weather',
        name:'Jatin'
    })
})



// app.com


app.get('/help',(req,res)=>{
    res.render('help',{
        page_title:'Help',
        title:'Help',
        name:'Jatin',
        helpText:'This is some helpful text'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        page_title:'About',
        title:'About Me',
        name:'Jatin'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        page_title:'Not found',
        title:'404',
        name:'Jatin',
        error:'Help article not found'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send ({
            error:'You must provide an address!'
        })
    }
    gecode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if (error) {
            return res.send({
                error:error
            }) 
        }
        
        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error) {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecastData:forecastData,
                location:location,
                address:req.query.address
            })

        })
    
    })
    // res.send({
    //     location:'It is III',
    //     forecast:'Sunny',
    //     add:req.query.address
    // })
})

app.get('*',(req,res)=>{
    res.render('error',{
        page_title:'Not found',
        title:'404',
        name:'Jatin',
        error:'Page Not Found'
    })
})





app.listen(port,()=>{
    console.log('Server is up or port '+port)
})