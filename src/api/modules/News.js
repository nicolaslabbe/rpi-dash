import moment from 'moment'

import config from '../config'
import {Api} from '../../helper'

class News extends Api {
	constructor(firebase) {
		super(firebase)
		this.userId = config.firebase.userId
		this.id = 'news'
		this.url = `https://newsapi.org/v1/articles?source=${config.news.source}&sortBy=${config.news.sort}&apiKey=${config.news.token}`
	}

	parse(obj) {
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
}

export default News