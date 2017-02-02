import {
	Weather
	,Train
	,Dates
	,News
	,Loader
} from './modules'

document.addEventListener('DOMContentLoaded', () => {
	let loader = new Loader()

	if (typeof firebase != 'undefined' && firebase !== null) {
		firebase.initializeApp(firebaseConfig.config);

		var weatherDb = firebase.database().ref('weather/' + firebaseConfig.userId);
		let weather = new Weather(firebase)
		weather.init()
		let train = new Train(firebase)
		train.init()
		let dates = new Dates()
		dates.init()
		let news = new News(firebase)
		news.init()

		loader.hide()
	}else {
		loader.hide()
	}
})