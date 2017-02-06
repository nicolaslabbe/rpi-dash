import moment from 'moment'
import cron from 'node-cron'

class Train {

	constructor(firebase) {
		this.transportWrapper = document.querySelector('[data-transport=true]')
		this.wrapper = document.querySelector('[data-train-time=true]')

		if (firebase != null) {
			this.db = firebase.database().ref('train/' + firebaseConfig.userId);
			this.start()
			this.bindEvents()
		}else {
			this.error()
		}
	}

	bindEvents() {
		this.db.on("child_changed", (snapshot) => {
			this.update(snapshot.val())
		});

		cron.schedule('* * * * *', () => {
			this.updateTime()
		})
	}

	start() {
		this.db.on('value', (snapshot) => {
			this.transportWrapper.classList.remove('hidden')
			this.update(snapshot.val())
		}, (errorObject) => {
		  this.error()
		});
	}

	updateTime() {
		if (this._timestamps != null) {
			this.transportWrapper.classList.remove('error')
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

	createTransport(t) {
		var li = document.createElement('li')

		var spanDirection = document.createElement('span')
		spanDirection.className = 'gray'
		spanDirection.innerHTML = t.direction

		var spanSeparator = document.createElement('span')
		spanSeparator.innerHTML = '&nbsp;-&nbsp;'

		var spanTime = document.createElement('span')
		spanTime.className = 'white span-time'
		spanTime.setAttribute('data-timestamp', t.time.timestamp)

		li.appendChild(spanDirection)
		li.appendChild(spanSeparator)
		li.appendChild(spanTime)

		return li
	}

	update(values) {
		var html = ""
		this.wrapper.innerHTML = ""
		this._timestamps = []
		var _directions = {}
		var max = 3

		Array.prototype.forEach.call(values, (val) => {
				
				var i = 0

				_directions[val.name] = {}

				Array.prototype.forEach.call(val.departures, (t) => {
				if(i < max) {

					if (_directions[val.name][t.direction] == null) {
						_directions[val.name][t.direction] = document.createElement('ul')
					}

					if (_directions[val.name][t.direction].childElementCount < max) {
						var li = this.createTransport(t)

						this._timestamps.push(li.querySelector('.span-time'))
						_directions[val.name][t.direction].appendChild(li)
					}
				}
				i++
			})
		})

		Array.prototype.forEach.call(Object.keys(_directions), (direction) => {
			var separator = document.createElement('div')
			separator.className = "station"
			separator.innerHTML = direction
			this.wrapper.appendChild(separator)

			Array.prototype.forEach.call(Object.keys(_directions[direction]), (ul) => {
				this.wrapper.appendChild(_directions[direction][ul])
			})
		})

		this.updateTime()
	}

	error() {
		this.transportWrapper.classList.remove('hidden')
		this.transportWrapper.classList.add('error')
		this.wrapper.innerHTML = "No informations availiable"
	}
}

export default Train