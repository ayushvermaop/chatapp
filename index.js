const { join } = require("path");
    
        // Node server Socket 
const io = require("socket.io")(8000,{cors:{origin:"*"}});
const users={};
io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('userjoined', {name:users[socket.id]});
        io.emit('users-list', users);
        console.log("New user is ", users[socket.id] , "with id-> " , socket.id );
    });

    socket.on('send', data=>{
        socket.broadcast.emit('receive', {message: data.msg, name:users[socket.id], id: data.id});
    });

    socket.on('disconnect', () =>{
        socket.broadcast.emit('userleft', {name:users[socket.id]});
        delete users[socket.id];
        io.emit('users-list', users);
    });
})