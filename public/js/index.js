// const moment = require("moment");
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
        
        let formattedTime = moment(Message.createdAt).format('h:mm a');

        let li = $('<li></li>');
        li.text(`${Message.from} ${formattedTime} : ${Message.text}`);

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
        let formattedTime = moment(message.createdAt).format('h:mm a');

        li.text(`${message.from} ${formattedTime}: `);
        a.attr('href' , message.url)
        li.append(a);
        $('#messages').append(li);
    })

    $('#message-form').on('submit', function (e) {        
        e.preventDefault();

        let messageTextBox = $('[name=message]');

        socket.emit('createMessage', {
            from: 'User',
            text: $('[name = message]').val()
        }, function () {

        });
        messageTextBox.val('');
    });
    let locationBTN = $('#send-location');

    locationBTN.on('click' , function(){
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser');
        }

        locationBTN.attr('disabled' , 'disabled').text('Sending location ...') ;//change the bottun to disable

        navigator.geolocation.getCurrentPosition(function(position){
            locationBTN.removeAttr('disabled').text('Send location');
           socket.emit('createLocationMessage' , {
               latitude : position.coords.latitude,
               longitude : position.coords.longitude
           });
        },function(){
            locationBTN.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location');
        })
    });

})