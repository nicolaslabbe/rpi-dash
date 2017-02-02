import moment from 'moment'
import clc from 'cli-color'
import * as firebase from 'firebase'

import config from '../config'


class FirebaseHelper {

	constructor() {
		this.database = firebase  
			.initializeApp(config.firebase.config)
			.database()
			.ref()
	}

	set(id, obj) {
		if(process.env.NODE_ENV != 'development') {
			this.database.child(id).set(obj, (response) => {
				console.log(clc.cyan(`${id}`), `updated at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
			})
		}
	}

	get(id) {
		const p = new Promise((resolve, reject) => {
			this.database.child(id).on('value', (snapshot) => {
				resolve(snapshot.val())
			}, (errorObject) => {
				reject({
					success: 0
				})
			});
		})

		return p
	}
}

export default new FirebaseHelper()