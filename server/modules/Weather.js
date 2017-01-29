import config from '../config'
import moment from 'moment'
import {Api} from '../classes'

let weather = new Api()

weather.get = function () {
	return this.call(`http://api.openweathermap.org/data/2.5/forecast/${config.weather.city}?units=metric&id=524901&APPID=${config.weather.token}`)
}

weather.parse = function (obj) {
	var json = {
		name: obj.result.city.name
		, hours: []
	}
	Array.prototype.forEach.call(obj.result.list, (item) => {
		json.hours.push({
			timestamp: item.date
			,dt_txt: item.dt_txt
			,temp: item.main.temp
			,humidity: item.main.humidity
			,weather: item.weather.main
			,clouds: item.clouds.all
			,wind: item.wind.speed
			,rain: item.rain
		})
	})
	return json
}

export default weather