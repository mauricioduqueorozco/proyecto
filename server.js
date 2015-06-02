'use strict'

const http = require('http')
// servidor basico 'env' es el manejador de la variable de entorno 'PORT'
const port = process.env.PORT || 8080

const server = http.createServer()

server.on('request', onRequest)
server.on('listening' , onListening)

server.listen(port)

function onRequest(req,res){
	res.end('hi')
}

function onListening(){
	console.log('Server running in port' + port)
}






