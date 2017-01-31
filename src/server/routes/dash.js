import Handlebars from 'handlebars'
import moment from 'moment'
import fs from 'fs'

import config from '../config'

let route = (req, res) => {
	var index = process.cwd() + '/static/views/index.html'
	var html = fs.readFileSync(index, 'utf8')

	var date = moment()
	var hours = date.hour()
	var minutes = date.minutes()
	var weekday = date.format("dddd, MMMM Do YYYY");

	var template = Handlebars.compile(html, {noEscape: true})
	var tmp = template({
		hours: `${hours}:${minutes}`
		,weekday: `${weekday}`
		,config: {
			firebase: JSON.stringify(config.firebase)
		}
	})

	res.set('Content-Type', 'text/html')
	return res.send(tmp)
}

export default route