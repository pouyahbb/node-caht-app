let socket = io();

socket.on('connect' , function(){
    console.log('Conneted to Server');
})

socket.on('disconnect' , function(){
    console.log('Disconnected from Server')
})

socket.on('newMessage' , function(Message){
    console.log('newMessage' , Message);
})

socket.emit('createMessage' , {
    from : 'Frank' , 
    text : 'Hi'
},function(data){
    console.log('Got it.' , data);
});