import clc from 'cli-color'

import config from '../config'
import {firebaseHelper} from '../../helper'

class Route {

	constructor(id = "") {
		this.id = id
	}

	get(req, res) {
		const p = new Promise((resolve, reject) => {
			firebaseHelper.get(`${this.id}/${config.firebase.userId}`)
				.then((result) => {
					res.send(result)
				})
		});

		return p
	}
}

export default Route