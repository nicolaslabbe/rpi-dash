import moment from 'moment'

class Gmail {

	constructor(firebase) {
		this.visible = true
		if(firebase != null) {
			this.db = firebase.database().ref('gmail/' + firebaseConfig.userId);
			this.wrapperMain = document.querySelector('[data-gmail-wrapper=true]')
			this.wrapper = this.wrapperMain.querySelector('[data-gmail=true]')
			this.lastUpdateWrapper = this.wrapperMain.querySelector('[last-update="true"]')
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
	}

	start() {
		this.db.on('value', (snapshot) => {
			this.update(snapshot.val())
		}, (errorObject) => {
		  console.log("The read failed: " + errorObject.code);
		});
	}

	update(val) {
		var html = ""
		var max = 10
		var i = 0
		Array.prototype.forEach.call(val.results, (t) => {
			if(i < max) {
				html += `<li>
				<div class="white bold">${t.from} - ${t.subject}</div>
				<div class="gray">${t.snippet}</div>
				</li>`
			}
			i++
		})
		this.wrapper.innerHTML = html

		this.lastUpdateWrapper.innerHTML = moment(parseInt(val.updatedAt.timestamp)).fromNow(true)
	}

	error() {
		this.wrapper.classList.remove('hidden')
		this.wrapper.classList.add('error')
		this.wrapper.innerHTML = "No informations availiable"
	}

	hide() {
		this.wrapperMain.classList.add('hidden')
	}

	show() {
		this.wrapperMain.classList.remove('hidden')
	}

	isVisible() {
		if (this.wrapperMain.classList.contains('hidden')) {
			return false
		}else {
			return true
		}
	}
}

export default Gmail