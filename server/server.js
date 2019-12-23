const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
let http = require('http')
const publicPath = path.join(__dirname, '../public');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/Users');
const port = process.env.PORT || 3000;
const {generateMessage , generateLocationMessage} = require('./utils/message');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();


app.use(express.static(publicPath)); //serve the static files such as images , css files , and js file

io.on('connection', (socket) => {
    console.log('New user conected');
 
    
    socket.on('join' , (params , callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id , params.name , params.room);
        io.to(params.room).emit('updateUserList' , users.getUserList(params.room));
        //socket.leave('the Office Fans');

        //io.emit => io.to('The Office Fans').emit
        //socket.broadcast.emit => socket.broadcast.to(''The Office Fans').emit
        //socket.emit
        
        socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage' , generateMessage('Admin' , `${params.name} has joined`));
        callback();
    })

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
        let user = users.removeUser(socket.id);
        if(user){
        io.to(user.room).emit('updateUserList' , users.getUserList(user.room));
        io.to(user.room).emit('newMessage' , generateMessage('Admin' , `${user.name} has left.`));
        }
    })
})
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})

