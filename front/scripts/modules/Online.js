import cron from 'node-cron'
import on from 'on'

class Online {

	constructor() {
		this.online = true
		this.onBecomeOffline = on(this)
		this.onBecomeOnline = on(this)

		this.init()
	}

	init() {
		cron.schedule('* * * * * *', () => {
			this.isOnline()
		})
		this.isOnline()
	}

	isOnline() {
		if(!navigator.onLine && this.online) {
			this.online = false
			this.onBecomeOffline._fire()
		}else if(navigator.onLine && !this.online) {
			this.online = true
			this.onBecomeOnline._fire()
		}
	}
}

export default Online