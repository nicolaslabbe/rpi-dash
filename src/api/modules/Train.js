import moment from 'moment'

import config from '../config'
import {Api} from '../../helper'

class Train extends Api {
	constructor(firebase) {
		super(firebase)
		this.userId = config.firebase.userId
		this.id = 'train'
	}

	get(token, stop_ids, date = new Date(), max = 100) {
		var p = new Promise((resolve) => {
			var promises = []
			var results = []
			date = date.toISOString().replace(/-|:/g, '').split('.')[0];
			Array.prototype.forEach.call(stop_ids, (stop_id) => {
				var p = this.call(
					`${config.train.url}${stop_id}/departures?datetime=${date}&data_freshness=realtime&count=100`,
					'GET',
					{'Authorization': `${token}`}
				)
				.then((result) => {
					results.push(result)
				})
				promises.push(p)
			})

			Promise.all(promises)
			.then(() => {
				resolve(results)
			}).catch(function(e) {
				resolve(results)
			})
		})

		return p
	}

	parse(obj, directions = null) {
		var date = moment()
		var json = {
			results: [],
			updatedAt: {
				timestamp: date.format('x'),
				date: date.format('MMMM Do YYYY, h:mm:ss a')
			}
		}

		Array.prototype.forEach.call(obj, (item) => {
			var station = {
				departures: [],
				links: item.result.links,
				disruptions: item.result.disruptions,
				notes: item.result.notes,
				feed_publishers: item.result.feed_publishers,
				exceptions: item.result.exceptions,
				name: ""
			}
			if(item.result.departures[0] != null && item.result.departures[0].stop_point !== null && item.result.departures[0].stop_point.name !== null) {
				station.name = item.result.departures[0].stop_point.name
			}
			let currentDate = moment()
			if(item.result != null && item.result.departures != null) {
				Array.prototype.forEach.call(item.result.departures, (departure) => {
					let date = moment(departure.stop_date_time.departure_date_time);
					if(directions == null || directions.indexOf(departure.display_informations.direction) > -1) {
						station.departures.push({
							direction: departure.display_informations.direction
							,time: {
								remaining: currentDate.to(date)
								,timestamp: date.valueOf()
							}
						})
					}
				})
			}else {
				station = item
			}

			json.results.push(station)
		})

		// return obj
		return json
	}
}

export default Train