import moment from 'moment'

class News {

	constructor(firebase) {
		this.visible = true
		if(firebase != null) {
			this.db = firebase.database().ref('news/' + firebaseConfig.userId);
			this.wrapperMain = document.querySelector('[data-news-wrapper=true]')
			this.wrapper = this.wrapperMain.querySelector('[data-news=true]')
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
		var max = 6
		var i = 0
		Array.prototype.forEach.call(val.results, (t) => {
			if(i < max) {
				html += `<li>
				<div class="white bold">${t.title}</div>
				<div class="gray">${t.description}</div>
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

export default News