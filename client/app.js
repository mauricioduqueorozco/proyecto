const xhr = require('xhr')
const Webrtc2Images = require('webrtc2images')
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

var quantityFrames = 100//200
var stepInterval = 10
var velRep = 30
var dataImg 
//var dots = new Array()
//var math = require('mathjs');

canvas.width = 400
canvas.height = 400

//var matrix = math.zeros(canvas.width, canvas.height);
document.body.appendChild(canvas)
var img = new Image()

const rtc = new Webrtc2Images({
  width: canvas.width,
  height: canvas.height,
  frames: quantityFrames,
  type: 'image/jpeg',
  quality: 0.9,
  interval: stepInterval
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

      body = JSON.parse(body)

      if (body.video) {
        graph(body.video)
      }
    })

  })
}, false)

function logError (err) {
  console.error(err)
}

function graph (images){   
  var count = 0
  setInterval(function (images,count) {
    colorTratament(images,count)
  }, velRep);
}

function colorTratament (images,count){
  
   
      img.src = images[count++] 
              img.onload = function(){
                var cont = 0
               ctx.drawImage(this,0,0,canvas.width,canvas.height)
               var dataImage = ctx.getImageData(0,0,canvas.width,canvas.height)
               dataImg = dataImage.data
                 for (var i = 0; i < dataImg.length; i += 4) {
                   //var aux = 0.34 * dataImg[i] + 0.5 * dataImg[i + 1] + 0.16 * dataImg[i + 2]
                   var aux = 0.1 * dataImg[i] + 0.1 * dataImg[i + 1] + 0.1 * dataImg[i + 2]
                   aux = Math.round(aux)
                   if(aux > 50) aux = 100 
                   else aux = 0
                   dataImg[i] = aux
                   dataImg[i + 1] = aux
                   dataImg[i + 2] = aux
                   dots[cont++] = aux
                 }
               
               ctx.putImageData(dataImage,0,0)          
              }  
     if(images.length == count) count=0
         
}


function dot (x,y){
   ctx.lineWidth = 1;
   ctx.fillStyle = 'green';
   ctx.fill()
   ctx.strokeStyle = 'green';
   ctx.beginPath();
   ctx.arc(x, y, 5,0, Math.PI * 2, false);
   ctx.closePath();
   ctx.stroke();
}
