import config from '../config'
import {Train} from '../modules'

let route = (req, res) => {
	Train.get(config.train.token, config.train.stop_id)
	.then((obj) => {
		res.send(Train.parse(obj, config.train.directions))
	},
	(result) => {
		res.send(result)
	})
}

export default route