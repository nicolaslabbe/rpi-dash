import config from '../config'
import moment from 'moment'
import {Api} from '../classes'

let news = new Api()

news.id = 'news'

news.get = function (coordinate) {
	return this.call(`https://newsapi.org/v1/articles?source=${config.news.source}&sortBy=${config.news.sort}&apiKey=${config.news.token}`)
}

news.parse = function (obj) {
	var json = obj.result
	return json
}

export default news