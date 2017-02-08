import moment from 'moment'

import config from '../config'
import {Api} from '../../helper'

class Pollution extends Api {
	constructor(firebase, coordinate) {
		super(firebase)
		this.userId = config.firebase.userId
		this.id = 'pollution'
		this.url = `http://api.openweathermap.org/pollution/v1/co/${coordinate}/current.json?appid=${config.weather.token}`
	}

	parse(obj) {
		var date = moment()
		var json = {
			results: obj.result,
			current: obj.result.data[0],
			updatedAt: {
				timestamp: date.format('x'),
				date: date.format('MMMM Do YYYY, h:mm:ss a')
			}
		}
		return json
	}
}

export default Pollution