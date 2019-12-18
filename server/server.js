const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
let http = require('http')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath)); //serve the static files such as images , css files , and js file

io.on('connection', (socket) => {
    console.log('New user conected');
 
    socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage' , generateMessage('Admin' , 'New user joined'));

    socket.on('createMessage' , function(Message , callback){
        console.log('createMessage' , Message);

        io.emit('newMessage' , generateMessage(Message.from , Message.text))
        callback('This is from the server');
        // socket.broadcast('newMessage' , {
        //     from : Message.from,
        //     text : Message.text,
        //     createAt : new Date().getTime()
        // }) 
    })



    socket.on('disconnect' , ()=>{
        console.log('User was disconnected');
    })
})
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})

//112