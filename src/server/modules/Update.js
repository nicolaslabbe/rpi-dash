import config from '../config'
import cron from 'node-cron'

import {Train, Pollution, Weather} from '../modules'

class Update {

	constructor() {

	}

	go() {
		Pollution.get(config.weather.pollution)
		.then((result) => {
			Pollution.save(Pollution.parse(result))
		},
		(result) => {
			console.log('cannot update pollution')
		})

		Train.get(config.train.token, config.train.stop_id)
		.then((obj) => {
			Train.save(Train.parse(obj, config.train.directions))
		},
		(result) => {
			console.log('cannot update train')
		})

		Weather.get()
		.then((result) => {
			Weather.save(Weather.parse(result))
		},
		(result) => {
			console.log('cannot update train')
		})
	}

	init() {
		cron.schedule('* * * * *', () => {
			this.go()
		})
		this.go()
	}
}

export default new Update()