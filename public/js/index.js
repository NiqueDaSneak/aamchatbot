$(document).ready(() => {
    var socket = io.connect();

    socket.emit('welcomeMessage')

    socket.on('botMessage', (data) => {
        $('.messages').prepend("<p class='bot-message'>" + data.data + "</p>").hide().fadeIn('slow');
    })

    socket.on('menuButtons', (data) => {
        for (var i = 0; i < data.data.length; i++) {
            $('.btns').append("<button type='button' value='" + data.data[i] + "'>" + data.data[i] + "</button>")
        }
    })

    socket.on('gif', (data) => {
      console.log(data.data);
      $('.messages').prepend("<img src='imgs/" + data.data + "' alt='GIF'>")
    })

    $('.btns').click(() => {
        if (event.target.value === "Yes") {
            socket.emit('menuRequest', {data: event.target.value})
            $('input').css('left', '0').promise().done(() => {
                setTimeout(() => {
                    $('.send').css('right', '6vw')
                }, 2000)
            })
        } else if (event.target.value === "Option 1") {
          socket.emit('vote', {data: 'option1'})
        } else if (event.target.value === "Option 2") {
          socket.emit('vote', {data: 'option2'})
        } else if (event.target.value === "Option 3") {
          socket.emit('vote', {data: 'option3'})
        } else {
            socket.emit('menuRequest', {data: event.target.value})
        }
        $('.btns').empty()
        $('.messages').empty()
    })

    $('.send').click(() => {
        $('.messages').empty()
        $('input').css('left', '-88vw')
        $('.send').css('right', '-22vw').promise().done(() => {
            socket.emit('saveNames', {name: $('input').val()})
        })

    })

    // end of DOM ready
})
