import moment from 'moment'
import config from '../config'
import {Api} from '../classes'

let train = new Api()

train.id = 'train'

train.get = function (token, stop_id, date = new Date(), max = 100) {
	date = date.toISOString().replace(/-|:/g, '').split('.')[0];
	return this.call(
		`${config.train.url}${stop_id}/departures?datetime=${date}&data_freshness=realtime&count=100`,
		'GET',
		{'Authorization': `${token}`}
	)
}

train.parse = function (obj, directions = null) {
	var json = {
		departures: [],
		links: obj.result.links,
		disruptions: obj.result.disruptions,
		notes: obj.result.notes,
		feed_publishers: obj.result.feed_publishers,
		exceptions: obj.result.exceptions
	}
	let currentDate = moment()
	if(obj.result != null && obj.result.departures != null) {
		Array.prototype.forEach.call(obj.result.departures, (departure) => {
			let date = moment(departure.stop_date_time.departure_date_time);
			if(directions == null || directions.indexOf(departure.display_informations.direction) > -1) {
				json.departures.push({
					direction: departure.display_informations.direction
					,time: {
						remaining: currentDate.to(date)
						,timestamp: date.valueOf()
					}
				})
			}
		})
	}else {
		json = obj.result
	}


	return json
}

export default train