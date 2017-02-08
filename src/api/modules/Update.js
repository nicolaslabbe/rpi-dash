import config from '../config'
import cron from 'node-cron'
import clc from 'cli-color'

import {FirebaseHelper} from '../../helper'

import {
	Train
	,Pollution
	,Weather
	,News
	,Gmail
} from './'

class Update {

	constructor() {
		this.firebase = new FirebaseHelper(config.firebase.config)
		this.gmail = new Gmail(this.firebase)
		this.weather = new Weather(this.firebase)
		this.news = new News(this.firebase)
		this.train = new Train(this.firebase)
		this.pollution = new Pollution(this.firebase, config.weather.pollution)
	}

	updateGmail() {
		this.gmail.get()
		.then((result) => {
			this.gmail.save(this.gmail.parse(result))
		},
		(result) => {
		})
	}

	updatePollution() {
		this.pollution.get()
		.then((result) => {
			this.pollution.save(this.pollution.parse(result))
		},
		(result) => {
		})
	}

	updateTrain() {
		this.train.get(config.train.token, config.train.stop_id)
		.then((obj) => {
			this.train.save(this.train.parse(obj, config.train.directions))
		},
		(result) => {
		})
	}

	updateWeather() {
		this.weather.get()
		.then((result) => {
			this.weather.save(this.weather.parse(result))
		},
		(result) => {
		})
	}

	updateNews() {
		this.news.get()
		.then((result) => {
			this.news.save(this.news.parse(result))
		},
		(result) => {
		})
	}

	init() {
		var p = new Promise((resolve) => {
			this.updateGmail()
			// this.updatePollution()
			this.updateTrain()
			this.updateWeather()
			this.updateNews()

			// cron.schedule(config.gmail.schedule, () => {
			// 	this.updateGmail()
			// })

			// cron.schedule(config.train.schedule, () => {
			// 	this.updateTrain()
			// 	this.updatePollution()
			// })

			// cron.schedule(config.weather.schedule, () => {
			// 	this.updateWeather()
			// })

			// cron.schedule(config.news.schedule, () => {
			// 	this.updateNews()
			// })
		})

		return p
	}
}

export default Update