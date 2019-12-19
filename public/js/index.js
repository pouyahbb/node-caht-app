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

    $('#message-form').on('submit', function (e) {
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: $('[name = message]').val()
        }, function () {

        })
    })
})