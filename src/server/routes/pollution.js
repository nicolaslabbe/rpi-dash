import config from '../config'
import {Pollution} from '../modules'

let route = (req, res) => {
	Pollution.get(config.weather.pollution)
	.then((result) => {
		var values = Pollution.parse(result)
		// Pollution.save(values)
		res.send(values)
	},
	(result) => {
		res.send(result)
	})
}

export default route