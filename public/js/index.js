$(document).ready(() => {
  var socket = io.connect();

   $('.main-content').fadeIn(200)
   .promise()
   .done(() => {
     socket.emit('welcomeMessage')
   })

   socket.on('botMessage', (data) => {
        $('.messages').prepend("<p class='bot-message'>" + data.data + "</p>").hide().fadeIn('slow');
    })

    socket.on('menuButtons', (data) => {
        for (var i = 0; i < data.data.length; i++) {
            $('.btns').append("<button type='button' value='" + data.data[i] + "'>" + data.data[i] + "</button>")
        }
    })

    $('.btns').click(() => {
        socket.emit('menuRequest', {data: event.target.value})
        $('.btns').empty()
        $('.messages').empty()
    })

   // end of DOM ready
})
