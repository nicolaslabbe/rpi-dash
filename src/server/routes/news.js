import config from '../config'
import {News} from '../modules'

let route = (req, res) => {
	News.get()
	.then((result) => {
		var values = News.parse(result)
		// Pollution.save(values)
		res.send(values)
	},
	(result) => {
		res.send(result)
	})
}

export default route