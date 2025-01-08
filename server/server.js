const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials:true
  }
})

io.on("connection", (socket) => {
  socket.on('send_message', (message) => {
    socket.broadcast.emit("receive_message", { ...message })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
})

server.listen(4000, (err) => {
  if (err) throw err
  console.log('server is listening to port 4000');
})