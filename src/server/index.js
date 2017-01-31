import express from 'express'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import path from 'path'

import config from './config'
import {firebaseHelper} from './classes/'

import {
	weatherRoute
	,pollutionRoute
	,satelliteRoute
	,trainRoute
	,dashRoute
} from './routes'

import {
	Update
} from './modules'

Update.init()

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
app.get('/', dashRoute)

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/`)
})