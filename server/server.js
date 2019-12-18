const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
let http = require('http')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath)); //serve the static files such as images , css files , and js file

io.on('connection', (socket) => {
    console.log('New user conected');

    socket.emit('newMessage' , {
        from : 'elmira',
        text : "Hey. what's up?",
        createAt : 1241
    });

    socket.on('createMessage' , function(Message){
        console.log('createMessage' , Message);
    })

    socket.on('disconnect' , ()=>{
        console.log('User was disconnected');
    })
})
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})