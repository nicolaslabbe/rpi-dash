import {Weather} from '../modules'

let route = (req, res) => {
	Weather.get()
	.then((result) => {
		res.send(Weather.parse(result))
	},
	(result) => {
		res.send(result)
	})
}

export default route