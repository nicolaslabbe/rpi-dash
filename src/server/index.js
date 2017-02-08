import express from 'express'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import path from 'path'
import clc from 'cli-color'

import config from './config/'

import {
	apiRoute
	,dashRoute
} from './routes'

var app = express()
var port = 8000

// Handlebars
var html = exphbs.create({extname: '.html'})
app.use(express.static(process.cwd() + '/static'))
app.set('views', path.join(process.cwd(), '/static/views'))
app.engine('html', html.engine)
app.set('view engine', 'html')

// api route
let gmail = new apiRoute('gmail')
let weather = new apiRoute('weather')
let pollution = new apiRoute('pollution')
let satellite = new apiRoute('satellite')
let train = new apiRoute('train')
let news = new apiRoute('news')

// routes
app.get('/gmail', gmail.get.bind(gmail))
app.get('/weather', weather.get.bind(weather))
app.get('/pollution', pollution.get.bind(pollution))
app.get('/satellite', satellite.get.bind(satellite))
app.get('/train', train.get.bind(train))
app.get('/news', news.get.bind(news))
app.get('/', dashRoute)

app.listen(config.port, () => {
  console.log(`Rpi-dash running at`, clc.cyan(`http://localhost:${config.port}/`))
})