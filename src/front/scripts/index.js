import {
	Weather
	,Train
	,Dates
	,News
	,Loader
	,ErrorMsg
	,Online
} from './modules'

document.addEventListener('DOMContentLoaded', () => {
	let loader = new Loader()
	let errorMsg = new ErrorMsg()
	let firebaseInstance = (typeof firebase != 'undefined' && firebase != null) ? firebase : null

	if (typeof firebaseInstance != 'undefined' && firebaseInstance !== null) {
		firebaseInstance.initializeApp(firebaseConfig.config);

		loader.hide()
	}else {
		errorMsg.show('No internet')
		loader.hide()
	}


	let weather = new Weather(firebaseInstance)
	let train = new Train(firebaseInstance)
	let dates = new Dates()
	let news = new News(firebaseInstance)
	let online = new Online()

	online.onBecomeOffline(() => {
		errorMsg.show('No internet')
		weather.error()
		news.error()
		train.error()
	})
	online.onBecomeOnline(() => {
		errorMsg.hide()
		weather.start()
		news.start()
		train.start()
	})
})