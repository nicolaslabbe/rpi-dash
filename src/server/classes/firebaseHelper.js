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
			console.log('response', response)
		})
	}
}

export default new FirebaseHelper()