// const io = require('socket.io/socket.io.js')
const socket = io()
const name = prompt('what is your name ?')
$('<div class="msg"></div>').text("hello "+name)
socket.on('chat-msg', data => {
    $('#message-container').append(
        $('<div class="msg"></div>').text(data)
    )
})
function addMsgForSender(msg) {
    $('#message-container').append(
        $('<div class="you"></div><br/>').text('you : '+msg)
    )
    
}
$('#send-button').click((event) => {
    event.preventDefault()
    addMsgForSender($('#message-input').val())
    socket.emit('new-msg', {
        name: name,
        msg : $('#message-input').val()
    })
})