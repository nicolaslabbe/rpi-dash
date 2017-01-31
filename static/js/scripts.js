function updateWeather(val) {
	document.querySelector('[data-weather-icon=true]').className = "wi " + val.current.icon + " big"
	document.querySelector('[data-weather-temp=true]').innerHTML = val.current.temp
}

function updateTrain(val) {
	var html = ""
	var max = 6
	var i = 0
	Array.prototype.forEach.call(val, function(t) {
		if(i < max) {
			html += '<li>' + t.direction + ' - ' + t.time.remaining + '</li>'
		}
		i++
	})
	document.querySelector('[data-train-time=true]').innerHTML = html
}

firebase.initializeApp(firebaseConfig.config);

var weather = firebase.database().ref('weather/' + firebaseConfig.userId);
weather.on('value', function(snapshot) {
	updateWeather(snapshot.val())
}, function (errorObject) {
  // console.log("The read failed: " + errorObject.code);
});

weather.on("child_changed", function(snapshot) {
	updateWeather(snapshot.val())
});

var train = firebase.database().ref('train/' + firebaseConfig.userId);
train.on('value', function(snapshot) {
	updateTrain(snapshot.val())
}, function (errorObject) {
  // console.log("The read failed: " + errorObject.code);
});

train.on("child_changed", function(snapshot) {
	updateTrain(snapshot.val())
});