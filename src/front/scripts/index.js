import {
	Weather
	,Train
	,Dates
	,News
} from './modules'

firebase.initializeApp(firebaseConfig.config);

var weatherDb = firebase.database().ref('weather/' + firebaseConfig.userId);
let weather = new Weather(firebase)
let train = new Train(firebase)
let dates = new Dates()
let news = new News(firebase)