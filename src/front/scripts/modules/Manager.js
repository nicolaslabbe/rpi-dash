import moment from 'moment'
import cron from 'node-cron'

import {
	Weather
	,Gmail
	,Train
	,Dates
	,News
	,Loader
	,ErrorMsg
	,Online
} from './'

class Manager {

	constructor(firebase) {
		this.loader = new Loader()
		this.errorMsg = new ErrorMsg()
		this.firebaseInstance = (typeof window.firebase != 'undefined' && window.firebase != null) ? window.firebase : null

		if (typeof this.firebaseInstance != 'undefined' && this.firebaseInstance !== null) {
			this.firebaseInstance.initializeApp(firebaseConfig.config);

			this.loader.hide()
		}else {
			this.errorMsg.show('No internet')
			this.loader.hide()
		}

		this.weather = new Weather(this.firebaseInstance)
		this.train = new Train(this.firebaseInstance)
		this.dates = new Dates()
		this.news = new News(this.firebaseInstance)
		this.gmail = new Gmail(this.firebaseInstance)
		this.online = new Online()

		this.bindEvents()
		this.update()
	}

	bindEvents() {
		this.online.onBecomeOffline(() => {
			this.errorMsg.show('No internet')
			this.weather.error()
			this.news.error()
			this.gmail.error()
			this.train.error()
		})
		this.online.onBecomeOnline(() => {
			this.errorMsg.hide()
			this.weather.start()
			this.news.start()
			this.gmail.start()
			this.train.start()
		})
		cron.schedule('*/30 * * * * *', () => {
			this.update()
		})
	}

	update() {
		console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
		console.log('this.news', this.news.isVisible())
		if (this.news.isVisible()) {
			this.news.hide()
			this.gmail.show()
		}else {
			this.gmail.hide()
			this.news.show()
		}
	}
}

export default Manager