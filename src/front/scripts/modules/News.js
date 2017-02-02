class News {

	constructor(firebase) {
		this.db = firebase.database().ref('news/' + firebaseConfig.userId);
		this.wrapper = document.querySelector('[data-news=true]')
	}

	init() {
		this.bindEvents()
	}

	bindEvents() {
		this.db.on('value', (snapshot) => {
			this.update(snapshot.val())
		}, (errorObject) => {
		  console.log("The read failed: " + errorObject.code);
		});

		this.db.on("child_changed", (snapshot) => {
			this.update(snapshot.val())
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
}

export default News