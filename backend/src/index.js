const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const routes = require('./routes')
const { getHttpError } = require('./errors')


const app = express()
const server = http.Server(app)
const io = socketio(server)


const connecteds = {}

io.on('connect', socket => {

    const { user_id } = socket.handshake.query

    connecteds[user_id] = socket.id

    io.emit('feedback', 'Wellcome')
})

app.use((req, res, next) => {
    req.io = io
    req.connecteds = connecteds
    next()
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/files', express.static(path.resolve('static', 'images')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use((err, req, res, next) => {

    console.error(err)

    const httpError = getHttpError(err)
    
    console.error(httpError)

    res.status(httpError.code).send(httpError.parse())

})


server.listen(4000)