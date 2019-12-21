const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
let http = require('http')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage , generateLocationMessage} = require('./utils/message');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath)); //serve the static files such as images , css files , and js file

io.on('connection', (socket) => {
    console.log('New user conected');
 
    socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage' , generateMessage('Admin' , 'New user joined'));

    socket.on('createMessage' , (Message )=>{
        console.log('createMessage' , Message);

        io.emit('newMessage' , generateMessage(Message.from , Message.text));
       
        // socket.broadcast('newMessage' , {
        //     from : Message.from,
        //     text : Message.text,
        //     createAt : new Date().getTime()
        // }) 
    });

    socket.on('createLocationMessage' , (coord)=>{
        io.emit('newLocationMessage' , generateLocationMessage('Admin' , coord.latitude , coord.longitude));
    })

    socket.on('disconnect' , ()=>{
        console.log('User was disconnected');
    })
})
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})

