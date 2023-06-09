const { join } = require("path");
    
        // Node server 
const io = require("socket.io")(8000,{cors:{origin:"*"}});
const user={};
io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        user[socket.id] = name;
        socket.broadcast.emit('userjoined', {name:user[socket.id]});

        console.log("New user is ", user[socket.id] , "with id-> " , socket.id );
    });

    socket.on('send', data=>{
        socket.broadcast.emit('receive', {message: data.msg, name:user[socket.id], id: data.id});
    });

    // socket.on('liked', id=>{
    //     socket.broadcast.emit('msg-like', id)
    // });

    socket.on('disconnect', () =>{
        socket.broadcast.emit('userleft', {name:user[socket.id]});
        delete user[socket.id];
    })
});
debugger