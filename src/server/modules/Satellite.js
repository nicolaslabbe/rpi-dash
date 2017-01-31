import config from '../config'
import {Api} from '../classes'

let satellite = new Api()

satellite.id = 'pollution'

satellite.get = function () {
	const p = new Promise((resolve, reject) => {
		resolve({
			success: 1,
			image: `http://sat.owm.io/sql/9/143/218?order=best&appid=${config.weather.token}`
		})
	})

	return p
}

export default satellite