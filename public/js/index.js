$(document).ready(function () {
    let socket = io();

    socket.on('connect', function () {
        console.log('Conneted to Server');
    })

    socket.on('disconnect', function () {
        console.log('Disconnected from Server')
    })

    socket.on('newMessage', function (Message) {
        console.log('newMessage', Message);

        let li = $('<li></li>');
        li.text(`${Message.from} : ${Message.text}`);

        $('#messages').append(li);
       
    })

    // socket.emit('createMessage', {
    //     from: 'Frank',
    //     text: 'Hi'
    // }, function () {

    //     console.log('Got it.');
    // });

    socket.on('newLocationMessage' , function(message){
        let li = $('<li></li>');
        let a = $('<a target="_blank">My Current Location</a>');

        li.text(`${message.from} : `);
        a.attr('href' , message.url)
        li.append(a);
        $('#messages').append(li);
    })

    $('#message-form').on('submit', function (e) {
        
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: $('[name = message]').val()
        }, function () {

        })
    })
    let locationBTN = $('#send-location');

    locationBTN.on('click' , function(){
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(function(position){
           socket.emit('createLocationMessage' , {
               latitude : position.coords.latitude,
               longitude : position.coords.longitude
           });
        },function(){
            alert('Unable to fetch location');
        })
    });

})