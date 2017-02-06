class Weather {

	constructor(firebase) {
		this.wrapper = document.querySelector('[data-weather-wrapper="true"]')
		this.icon = document.querySelector('[data-weather-icon=true]')
		this.temp = document.querySelector('[data-weather-temp=true]')

		if(firebase != null) {
			this.db = firebase.database().ref('weather/' + firebaseConfig.userId);
			this.start()
			this.bindEvents()
		}else {
			this.error()
		}
	}

	bindEvents() {
		this.db.on("child_changed", (snapshot) => {
			this.update(snapshot.val())
		})
	}

	start() {
		this.db.on('value', (snapshot) => {
			this.wrapper.classList.remove('hidden')
			this.update(snapshot.val())
		}, (errorObject) => {
			this.error()
		})
	}

	update(val) {
		this.wrapper.classList.remove('error')
		this.icon.className = `wi ${val.current.icon}`
		this.temp.innerHTML = Math.round(val.current.temp)
	}

	error() {
		this.icon.className = `wi wi-cloud-refresh`
		this.temp.innerHTML = "X"

		this.wrapper.classList.remove('hidden')
		this.wrapper.classList.add('error')
	}
}

export default Weather