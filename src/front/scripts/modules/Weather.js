class Weather {

	constructor(firebase) {
		this.db = firebase.database().ref('weather/' + firebaseConfig.userId);
		this.bindEvents()
		this.icon = document.querySelector('[data-weather-icon=true]')
		this.temp = document.querySelector('[data-weather-temp=true]')
	}

	bindEvents() {
		this.db.on('value', (snapshot) => {
			this.update(snapshot.val())
		}, (errorObject) => {
		  // console.log("The read failed: " + errorObject.code);
		});

		this.db.on("child_changed", (snapshot) => {
			this.update(snapshot.val())
		});
	}

	update(val) {
		this.icon.className = `wi ${val.current.icon}`
		this.temp.innerHTML = Math.round(val.current.temp)
	}
}

export default Weather