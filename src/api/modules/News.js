import moment from 'moment'

import config from 'config'
import {Api} from '../../helper'

let news = new Api()

news.id = 'news'

news.get = function (coordinate) {
	return this.call(`https://newsapi.org/v1/articles?source=${config.news.source}&sortBy=${config.news.sort}&apiKey=${config.news.token}`)
}

news.parse = function (obj) {
	var date = moment()
	var json = {
		results: obj.result.articles,
		updatedAt: {
			timestamp: date.format('x'),
			date: date.format('MMMM Do YYYY, h:mm:ss a')
		}
	}
	return json
}

export default news