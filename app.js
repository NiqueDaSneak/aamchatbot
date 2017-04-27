'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var fs = require('fs')
var db = JSON.parse(fs.readFileSync('db/content.json', 'utf8'))

app.use(express.static('public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {})

var port = process.env.PORT || 3000
server.listen(port, () => {
    console.log('Server listening on port ' + port)
})
server.on('error', (error) => {
    console.log(error)
})

module.exports = app
