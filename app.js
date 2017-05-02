'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var fs = require('fs')
var content = JSON.parse(fs.readFileSync('db/content.json', 'utf8'))
var db = require('diskdb')
db.connect('db', ['names', 'option1', 'option2', 'option3'])

app.use(express.static('public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
    console.log('Socket w/ client successful')

    socket.on('welcomeMessage', () => {
        socket.emit('botMessage', {data: content.welcomeMessage.message})
        var menuButtons = function() {
            return socket.emit('menuButtons', {data: content.welcomeMessage.options})
        }
        setTimeout(menuButtons, 1200)
    })

    socket.on('menuRequest', (data) => {
        switch (data.data) {
            case "":
              socket.emit('botMessage', {
                data: content[data.data].message
              })
              break;
            default:
              if (content[data.data].gif) {
                console.log('you clicked a person!')
                socket.emit('gif', {data: content[data.data].gif})
              }
              socket.emit('botMessage', {
                data: content[data.data].message
              })
              socket.emit('menuButtons', {
                data: content[data.data].options
              })
        }
    })
    socket.on('saveNames', (data) => {
        var respondant = {
            name: data.name,
            saved: new Date()
        }
        db.names.save(respondant)
        console.log('Person saved!')
        socket.emit('botMessage', {data: "Thank You, please choose an option"})
        socket.emit('menuButtons', {data: ["New Hires", "Creative 101"]})
    })

    socket.on('vote', (data) => {
      var vote = {
        time: new Date()
      }
      db[data.data].save(vote)
      socket.emit('botMessage', {data: "Thank You, please choose an option"})
      socket.emit('menuButtons', {data: ["New Hires", "Creative 101"]})
    })
})

var port = process.env.PORT || 3000
server.listen(port, () => {
    console.log('Server listening on port ' + port)
})
server.on('error', (error) => {
    console.log(error)
})

module.exports = app
