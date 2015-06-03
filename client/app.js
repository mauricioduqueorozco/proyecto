//browserify client/app.js -o public/app.js
//source ~/.profile
const Webrtc2Images = require('webrtc2images')

const rtc = new Webrtc2Images({
	width : 200,
	height : 200,
	frames : 60,
	type : 'images/jpeg',
	quality : 0.4,
	interval : 17
})

rtc.startVideo(function (err) {
	if (err) return logError(err)
})

const record = document.querySelector('#record')

record.addEventListener('click', function(e){
	e.preventDefault()

	rtc.recordVideo(function (err, frames){
		if(err)return logError(err)
		console.log(frames)
	})
}, false)

function logError(err){
	console.error(err)
}