const app = require("express")()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', client => {
    console.log("User " + client.id + " is connected")
    client.on('disconnect', () => { /* … */ });
})

server.listen(3005, () => {
    console.log("Server is listen on http://localhost:3005")
});