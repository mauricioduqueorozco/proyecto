'use strict'

const http = require('http')
// servidor basico 'env' es el manejador de la variable de entorno 'PORT'
const port = process.env.PORT || 8080

// se crea los metodos de req y res
const server = http.createServer(onRequest)

server.listen(port, onListening)

function onRequest(req,res){
	res.end('hi')
}
function onListening(){
	console.log('Server running in port' + port)
}






