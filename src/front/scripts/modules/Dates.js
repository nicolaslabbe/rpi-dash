import moment from 'moment'
import cron from 'node-cron'

class Time {

	constructor(firebase) {
		this.hours = document.querySelector('[data-hours=true]')
		this.minutes = document.querySelector('[data-minutes=true]')
		this.seconds = document.querySelector('[data-seconds=true]')
		this.meridiem = document.querySelector('[data-meridiem=true]')
		this.day = document.querySelector('[data-day=true]')
	}

	init() {
		this.bindEvents()
	}

	bindEvents() {
		cron.schedule('* * * * * *', () => {
			this.update()
		})
		this.update()
	}

	update(val) {
		var date = moment()
		this.hours.innerHTML = date.format('hh')
		this.minutes.innerHTML = date.format('mm')
		this.seconds.innerHTML = date.format('ss')
		this.meridiem.innerHTML = date.format('a')
		this.day.innerHTML = date.format("dddd, MMMM Do YYYY")
	}
}

export default Time