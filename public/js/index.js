$(document).ready(() => {

  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  }

  if (!isMobile.any()) {
    $('body').empty().append("<div class='cover'><p>Please view this on a mobile device only</p></div>")
  }

  $(window).on("orientationchange", (event) => {
    if (window.orientation === 90) {
      $('.hide-orientation').fadeIn()
    }

    if (window.orientation === -90) {
      $('.hide-orientation').fadeIn()
    }

    if (window.orientation === 0) {
        $('.hide-orientation').fadeOut()
    }
  })

    var socket = io.connect();

    socket.emit('welcomeMessage')

    socket.on('botMessage', (data) => {
        $('.messages').append("<div class='bot-message'><img src='imgs/logo.png' alt='BotLogo'><span class='bot-text'>" + data.data + "</span></div>").hide().fadeIn('slow');
    })

    socket.on('menuButtons', (data) => {
        for (var i = 0; i < data.data.length; i++) {
            $('.btns').append("<button type='button' value='" + data.data[i] + "'>" + data.data[i] + "</button>")
        }
    })

    socket.on('gif', (data) => {
      $('.messages').prepend("<img class='new-hire-img' src='imgs/" + data.data + "' alt='GIF'>")
    })

    $('.btns').click(( event ) => {
        if (event.target.value === "Creative 101") {
            socket.emit('menuRequest', {data: event.target.value})
            $('input').css('bottom', '2vh').promise().done(() => {
                setTimeout(() => {
                    $('.send').css('right', '3vw')
                }, 2000)
            })
        // } else if (event.target.value === "I Already Know This Stuff") {
        //   socket.emit('vote', {data: 'I Already Know This Stuff'})
        // } else if (event.target.value === "I Am Uninterested") {
        //   socket.emit('vote', {data: 'I Am Uninterested'})
        // } else if (event.target.value === "THE ACCOUNT TEAM RULES!!") {
        //   socket.emit('vote', {data: 'THE ACCOUNT TEAM RULES!!'})
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
