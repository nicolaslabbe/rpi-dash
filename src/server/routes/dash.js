import Handlebars from 'handlebars'
import moment from 'moment'
import fs from 'fs'

import config from 'config'

let route = (req, res) => {
	var index = process.cwd() + '/static/views/index.html'
	var html = fs.readFileSync(index, 'utf8')

	var template = Handlebars.compile(html, {noEscape: true})
	var tmp = template({
		config: {
			firebase: JSON.stringify(config.firebase)
		}
	})

	res.set('Content-Type', 'text/html')
	return res.send(tmp)
}

export default route