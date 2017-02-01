import moment from 'moment'
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
		this.database.child(id).set(obj, (response) => {
			console.log(`${id} updated at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
		})
	}
}

export default new FirebaseHelper()