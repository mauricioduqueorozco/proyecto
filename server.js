'use strict'

const http = require('http')
const fs = require('fs')
// servidor basico 'env' es el manejador de la variable de entorno 'PORT'
const port = process.env.PORT || 8080

const server = http.createServer()

server.on('request', onRequest)
server.on('listening' , onListening)

server.listen(port)

function onRequest(req,res){
	let file = fs.readFileSync('public/index.html')
	res.end(file)
}

function onListening(){
	console.log('Server running in port' + port)
}






