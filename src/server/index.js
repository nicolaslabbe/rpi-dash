import express from 'express'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import path from 'path'
import clc from 'cli-color'

import config from './config'
import {firebaseHelper} from './classes/'

import {
	weatherRoute
	,pollutionRoute
	,satelliteRoute
	,trainRoute
	,dashRoute
	,newsRoute
} from './routes'

import {
	Update
} from './modules'

var app = express()
var port = 8000

// Handlebars
var html = exphbs.create({extname: '.html'})
app.use(express.static(process.cwd() + '/static'))
app.set('views', path.join(process.cwd(), '/static/views'))
app.engine('html', html.engine)
app.set('view engine', 'html')

// routes
app.get('/weather', weatherRoute)
app.get('/pollution', pollutionRoute)
app.get('/satellite', satelliteRoute)
app.get('/train', trainRoute)
app.get('/news', newsRoute)
app.get('/', dashRoute)

app.listen(config.port, () => {
  console.log(`Rpi-dash running at`, clc.cyan(`http://localhost:${config.port}/`))
})

Update.init()
.then(() => {
	console.log(clc.cyan(`Api update finished`))
})