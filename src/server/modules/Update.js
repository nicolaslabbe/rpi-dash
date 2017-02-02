import config from '../config'
import cron from 'node-cron'

import Train from './Train'
import Pollution from './Pollution'
import Weather from './Weather'
import News from './News'

class Update {

	constructor() {
	}

	updatePollution() {
		Pollution.get(config.weather.pollution)
		.then((result) => {
			Pollution.save(Pollution.parse(result))
		},
		(result) => {
		})
	}

	updateTrain() {
		Train.get(config.train.token, config.train.stop_id)
		.then((obj) => {
			Train.save(Train.parse(obj, config.train.directions))
		},
		(result) => {
		})
	}

	updateWeather() {
		Weather.get()
		.then((result) => {
			Weather.save(Weather.parse(result))
		},
		(result) => {
		})
	}

	updateNews() {
		News.get()
		.then((result) => {
			News.save(News.parse(result))
		},
		(result) => {
		})
	}

	init() {
		var p = new Promise((resolve) => {
			this.updatePollution()
			this.updateTrain()
			this.updateWeather()
			this.updateNews()

			cron.schedule(config.train.schedule, () => {
				this.updateTrain()
				this.updatePollution()
			})

			cron.schedule(config.weather.schedule, () => {
				this.updateWeather()
			})

			cron.schedule(config.news.schedule, () => {
				this.updateNews()
			})
		})

		return p
	}
}

export default new Update()