import config from '../config'
import {Train} from '../modules'

let route = (req, res) => {
	Train.get(config.train.token, config.train.stop_id)
	.then((obj) => {
		var values = Train.parse(obj, config.train.directions)
		// Train.save(values)
		res.send(values)
	},
	(result) => {
		res.send(result)
	})
}

export default route