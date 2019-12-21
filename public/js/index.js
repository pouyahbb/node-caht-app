// const moment = require("moment");
$(document).ready(function () {
    let socket = io();

    function scrollToBottom(){
        //Selectors
        let messages = $('#messages');
        let newMessage = messages.children('li:last-child');
        //Height
        let clientHeight = messages.prop('clientHeight');
        let scrollTop = messages.prop('scrollTop');
        let scrollHeight = messages.prop('scrollHeight');
        let newMessageHeight = newMessage.innerHeight();
        let lastMessageHeight = newMessage.prev().innerHeight();
        if(clientHeight + scrollTop  + newMessageHeight + lastMessageHeight >= scrollHeight){
            messages.scrollTop(scrollHeight);
        }
    }

    socket.on('connect', function () {
        console.log('Conneted to Server');
    })

    socket.on('disconnect', function () {
        console.log('Disconnected from Server')
    })

    socket.on('newMessage', function (Message) {
        console.log('newMessage', Message);
        let formattedTime = moment(Message.createdAt).format('h:mm a');
        
        let template = $('#message-template').html();
        let html = Mustache.render(template , {
            text : Message.text,
            from : Message.from,
            createdAt : formattedTime
        });

        $('#messages').append(html);
        scrollToBottom();

        // let li = $('<li></li>');
        // li.text(`${Message.from} ${formattedTime} : ${Message.text}`);

        // $('#messages').append(li);
       
    })

    // socket.emit('createMessage', {
    //     from: 'Frank',
    //     text: 'Hi'
    // }, function () {

    //     console.log('Got it.');
    // });

    socket.on('newLocationMessage' , function(message){
        // let li = $('<li></li>');
        // let a = $('<a target="_blank">My Current Location</a>');
        let formattedTime = moment(message.createdAt).format('h:mm a');

        // li.text(`${message.from} ${formattedTime}: `);
        // a.attr('href' , message.url) 
        // li.append(a);
        // $('#messages').append(li);
        let template = $('#location-message-template').html();
        let html = Mustache.render(template , {
            from : message.from,
            url : message.url,
            createdAt :formattedTime
        });
        $('#messages').append(html);
        scrollToBottom();
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