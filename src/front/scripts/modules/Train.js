import moment from 'moment'
import cron from 'node-cron'

class Train {

	constructor(firebase) {
		this.db = firebase.database().ref('train/' + firebaseConfig.userId);
		this.wrapper = document.querySelector('[data-train-time=true]')
	}

	init() {
		this.bindEvents()
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

		cron.schedule('* * * * *', () => {
			this.updateTime()
		})
	}

	updateTime() {
		if (this._timestamps != null) {
			Array.prototype.forEach.call(this._timestamps, (timestamp) => {
				// console.log(timestamp.getAttribute('data-timestamp'))
				var time = moment(parseInt(timestamp.getAttribute('data-timestamp')))
				var now = moment()
				var diff = time.diff(now, 'minutes')
				if(diff < 10 && diff > 0) {
					diff = `0${diff}`
				}
				timestamp.innerHTML = `${diff} min`
			})
		}
	}

	update(values) {
		var html = ""
		this.wrapper.innerHTML = ""
		this._timestamps = []
		Array.prototype.forEach.call(values, (val) => {
				var max = 6
				var i = 0

				var separator = document.createElement('li')
				separator.className = "station"
				separator.innerHTML = val.name
				this.wrapper.appendChild(separator)

				Array.prototype.forEach.call(val.departures, (t) => {
				if(i < max) {
					var li = document.createElement('li')

					var spanDirection = document.createElement('span')
					spanDirection.className = 'gray'
					spanDirection.innerHTML = t.direction

					var spanSeparator = document.createElement('span')
					spanSeparator.innerHTML = '&nbsp;-&nbsp;'

					var spanTime = document.createElement('span')
					spanTime.className = 'white'
					spanTime.setAttribute('data-timestamp', t.time.timestamp)

					li.appendChild(spanDirection)
					li.appendChild(spanSeparator)
					li.appendChild(spanTime)

					this._timestamps.push(spanTime)
					this.wrapper.appendChild(li)
				}
				i++
			})
		})
		this.updateTime()
	}
}

export default Train