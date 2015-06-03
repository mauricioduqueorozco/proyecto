const xhr = require('xhr')
const Webrtc2Images = require('webrtc2images')

const rtc = new Webrtc2Images({
  width: 400,
  height: 400,
  frames: 300,
  type: 'image/jpeg',
  quality: 0.9,
  interval: 10
})

rtc.startVideo(function (err) {
  if (err) return logError(err)
})

const record = document.querySelector('#record')

record.addEventListener('click',  function (e) {
  e.preventDefault()

  rtc.recordVideo(function (err, frames) {
    if (err) return logError(err)

    xhr({
      uri: '/process',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: frames }),
    }, function (err, res, body) {
      if (err) return logError(err)

      console.log(JSON.parse(body))
    })

  })
}, false)

function logError (err) {
  console.error(err)
}
