const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');
const PORT = process.env.PORT || 5000;
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utility');

const app = express();
const server = http.createServer(app); // turns computer into an http server
const io = socketio(server);

// server listen for event
io.on('connection', (socket) => {
    // one specific socket that rep a specific connection
    // no socket in call back because use left
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('messsage', { user: 'admin', text: `User ${user.name} has left` });
            // send updated list of user when someone left
            io.to(user.room).emit('roomInfo', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });

    // socket listening to join request
    socket.on('join', (joinInfo, callback) => {
        const { name, room } = joinInfo;

        const { user, error } = addUser(socket.id, name, room);

        // trigger callback immedaitly after event, for error handling
        if (error) { return callBack(error); }

        // admin send joined notice (send from server to revieve by client)
        // to user
        socket.emit('message',
            { userName: 'admin', text: `${name}, welcome to ${room}!` });
        // to others in the room
        socket.to(room).emit('message',
            { userName: 'admin', text: `${name} has joined ${room}!` });
        socket.join(room);

        // tell the newly joined user who is in the room

        io.to(user.room).emit('roomInfo', { room: user.room, users: getUsersInRoom(user.room) });

        // callback();
    });

    // listening to event send to server by client
    socket.on('userMessage', ({ message }) => {
        const user = getUser(socket.id); // socket.id is user's id
        console.log(user);
        console.log(message);
        console.log("index.js done");
        io.to(user.room).emit('message', { userName: user.name, text: message });
        // io.to(user.room).emit('message', { userName: "hello" });


    });


});

app.use(router);

server.listen(PORT, () => {
    console.log(`backend server are listening on port ${PORT}`);
});