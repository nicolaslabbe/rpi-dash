import express from 'express'
import config from './config'
import {weatherRoute, satelliteRoute, trainRoute} from './routes'

var app = express()
var port = 8000

app.get('/weather', weatherRoute)
app.get('/satellite', satelliteRoute)
app.get('/train', trainRoute)
app.get('/', (req, res) => {
	console.log(Weather)
	Weather.get()
	res.send('hello express 2')
})

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/`)
})