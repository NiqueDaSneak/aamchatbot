$(document).ready(() => {
    var socket = io.connect();

    socket.emit('welcomeMessage')

    socket.on('botMessage', (data) => {
        $('.messages').prepend("<div class='bot-message'><img src='imgs/logo.png' alt='BotLogo'><span class='bot-text'>" + data.data + "</span></div>").hide().fadeIn('slow');
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
      console.log([event.target.value]);
        if (event.target.value === "Hell Yeah") {
            socket.emit('menuRequest', {data: event.target.value})
            $('input').css('bottom', '2vh').promise().done(() => {
                setTimeout(() => {
                    $('.send').css('right', '2vw')
                }, 2000)
            })
        } else if (event.target.value === "I Already Know This Stuff") {
          socket.emit('vote', {data: 'I Already Know This Stuff'})
        } else if (event.target.value === "I Am Uninterested") {
          socket.emit('vote', {data: 'I Am Uninterested'})
        } else if (event.target.value === "THE ACCOUNT TEAM RULES!!") {
          socket.emit('vote', {data: 'THE ACCOUNT TEAM RULES!!'})
        } else {
            socket.emit('menuRequest', {data: event.target.value})
        }
        $('.btns').empty()
        $('.messages').empty()
    })

    $('.send').click(() => {
        $('.messages').empty()
        $('input').css('bottom', '-88vw')
        $('.send').css('right', '-22vw').promise().done(() => {
            socket.emit('saveNames', {email: $('input').val()})
        })

    })

    // end of DOM ready
})
