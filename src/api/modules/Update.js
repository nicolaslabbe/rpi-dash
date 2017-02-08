import config from 'config'
import cron from 'node-cron'
import clc from 'cli-color'

import {
	Train
	,Pollution
	,Weather
	,News
	,Gmail
} from './'

class Update {

	constructor() {
	}

	updateGmail() {
		Gmail.get()
		.then((result) => {
			Gmail.save(Gmail.parse(result))
		},
		(result) => {
		})
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
			this.updateGmail()
			this.updatePollution()
			this.updateTrain()
			this.updateWeather()
			this.updateNews()

			cron.schedule(config.gmail.schedule, () => {
				this.updateGmail()
			})

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

export default Update