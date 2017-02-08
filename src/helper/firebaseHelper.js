import moment from 'moment'
import clc from 'cli-color'
import * as firebase from 'firebase'

class FirebaseHelper {
	
	constructor(config) {
		this.database = firebase  
			.initializeApp(config)
			.database()
			.ref()
	}

	set(id, obj) {
		this.database.child(id).set(obj, (response) => {
			console.log(clc.cyan(`${id}`), `updated at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
		})
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

export default FirebaseHelper