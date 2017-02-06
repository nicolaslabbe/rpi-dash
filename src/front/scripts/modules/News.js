class News {

	constructor(firebase) {
		if(firebase != null) {
			this.db = firebase.database().ref('news/' + firebaseConfig.userId);
			this.wrapper = document.querySelector('[data-news=true]')
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
		Array.prototype.forEach.call(val.articles, (t) => {
			if(i < max) {
				html += `<li>
				<div class="white bold">${t.title}</div>
				<div class="gray">${t.description}</div>
				</li>`
			}
			i++
		})
		this.wrapper.innerHTML = html
	}

	error() {
		this.wrapper.classList.remove('hidden')
		this.wrapper.classList.add('error')
		this.wrapper.innerHTML = "No informations availiable"
	}
}

export default News