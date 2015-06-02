'use strict'

const http = require('http')
// servidor basico 'env' es el manejador de la variable de entorno 'PORT'
const port = process.env.PORT || 8080

const server = http.createServer()

server.listen(port)






