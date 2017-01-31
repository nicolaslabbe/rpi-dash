import config from '../config'
import moment from 'moment'
import {Api} from '../classes'

let pollution = new Api()

pollution.id = 'pollution'

pollution.get = function (coordinate) {
	return this.call(`http://api.openweathermap.org/pollution/v1/co/${coordinate}/current.json?appid=${config.weather.token}`)
}

pollution.parse = function (obj) {
	var json = obj.result
	json.current = obj.result.data[0]
	return json
}

export default pollution