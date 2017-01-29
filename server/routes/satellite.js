import {Satellite} from '../modules'

let route = (req, res) => {
	Satellite.get()
	.then((result) => {
		res.send(`<img src="${result.image}" />`)
	},
	(result) => {
		res.send(result)
	})
}

export default route