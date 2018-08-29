'use strict'
const app = require('../src/app')
const http = require('http')
const debug = require('debug')('nodestr:server')

const normalizePort = require('normalize-port');


const port = normalizePort(process.env.PORT || '3001')
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

console.log('API rodando na porta ' + port)

function onError(erros){
    if(error.syscall != 'listen'){
        throw error
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port

        switch (error.code){
            case 'EACCES':
                console.error(bind + ' requires elevated privileges')
                process.exit(1)
                break
            
            case 'EADDINUSE':
                console.error(bind + ' is already in use')
                process.exit(1)
                break
        }
}

function onListening(){
    const addr = server.address()
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    debug('Listening on ' + bind)
}
