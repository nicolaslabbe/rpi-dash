import {Weather} from '../modules'

let route = (req, res) => {
	Weather.get()
	.then((result) => {
		var values = Weather.parse(result)
		// Weather.save(values)
		res.send(values)
	},
	(result) => {
		res.send(result)
	})
}

export default route