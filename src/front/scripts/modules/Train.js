import moment from 'moment'

class Train {

	constructor(firebase) {
		this.db = firebase.database().ref('train/' + firebaseConfig.userId);
		this.wrapper = document.querySelector('[data-train-time=true]')
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
	}

	update(val) {
		var html = ""
		var max = 6
		var i = 0
		Array.prototype.forEach.call(val.departures, (t) => {
			var remaining = moment(t.time.timestamp).valueOf()
			if(i < max) {
				html += `<li>
					<span class="gray">${t.direction}</span>
					&nbsp;-&nbsp;
					<span class="white">${remaining}</span>
				</li>`
			}
			i++
		})
		this.wrapper.innerHTML = html
	}
}

export default Train