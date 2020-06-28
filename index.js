const express = require('express')
const app = new express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const chalk = require('chalk')
const PORT =  process.env.PORT || 5000
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(index.html)
})
io.on('connection', function (socket) {
    console.log('\nnew user connected!  :', socket.id)
    socket.on('new-msg', function (details) {
        socket.broadcast.emit('chat-msg', details.name+" : "+details.msg)
    })
    socket.on('disconnect', function () {
        console.log(
            chalk.redBright('user disconnected!')
        )
    })
})
http.listen(PORT,console.log(chalk.blue(`server running on : ${PORT}`)))