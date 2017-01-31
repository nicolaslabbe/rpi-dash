import config from '../config'
import moment from 'moment'
import {Api} from '../classes'

let weather = new Api()

weather.id = 'weather'

weather.get = function () {
	return this.call(`http://api.openweathermap.org/data/2.5/forecast/${config.weather.city}?units=metric&id=524901&APPID=${config.weather.token}`)
}

weather.parseSingle = function (item) {
	return {
		timestamp: item.dt
		,dt_txt: item.dt_txt
		,temp: item.main.temp
		,humidity: item.main.humidity
		,weather: item.weather[0].main
		,clouds: item.clouds.all
		,wind: item.wind.speed
		,rain: item.rain
		,icon: this.getIcon(item.weather[0].icon)
	}
}

weather.parse = function (obj) {
	var json = {
		name: obj.result.city.name
		,current: {}
		,hours: []
	}
	json.current = this.parseSingle(obj.result.list[0])

	Array.prototype.forEach.call(obj.result.list, (item) => {
		json.hours.push(this.parseSingle(item))
	})
	return json
}

weather.getIcon = function (code) {
	var icon = 'wi-day-sunny'
	switch(code) {
		case '01d':
			icon = 'wi-day-sunny'
			break
		case '02d':
			icon = 'wi-day-cloudy'
			break
		case '03d':
			icon = 'wi-cloud'
			break
		case '04d':
			icon = 'wi-cloudy'
			break
		case '09d':
			icon = 'wi-rain'
			break
		case '10d':
			icon = 'wi-day-sleet'
			break
		case '11d':
			icon = 'wi-lightning'
			break
		case '13d':
			icon = 'wi-snow'
			break
		case '50d':
			icon = 'wi-day-cloudy'
			break
		case '01n':
			icon = 'wi-night-clear'
			break
		case '02n':
			icon = 'wi-night-cloudy'
			break
		case '03n':
			icon = 'wi-cloun'
			break
		case '04n':
			icon = 'wi-cloudy'
			break
		case '09n':
			icon = 'wi-rain'
			break
		case '10n':
			icon = 'wi-night-sleet'
			break
		case '11n':
			icon = 'wi-lightning'
			break
		case '13n':
			icon = 'wi-snow'
			break
		case '50n':
			icon = 'wi-night-cloudy'
			break
	}
	
	return icon
}

export default weather