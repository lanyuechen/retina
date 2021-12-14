const { createServer } = require('http');
const { Server } = require('socket.io');
const nodeStatic = require('node-static');

const PORT = 8080;

const fileServer = new nodeStatic.Server();

const httpServer = createServer((req, res) => {
  fileServer.serve(req, res);
});

httpServer.listen(PORT);

const io = new Server(httpServer);
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

const peers = [];

console.log(`Server: http://localhost:${PORT}`);

io.sockets.on('connection', (socket) => {
  socket.on('disconnect', (reason) => {
    const idx = peers.findIndex(d => d.clientId === socket.id);
    if (idx > -1) {
      const peer = peers[idx];
      console.log(`${peer.nickname}断开连接：${reason}`);
      peers.splice(idx, 1);
      io.sockets.emit('peer-leave-room', socket.id);
    }
  });

  socket.on('message', (message) => {
    console.log('Receive message:', message);
    socket.broadcast.emit('message', message);
  });

  socket.on('joinRoom', async(room, userInfo) => {
    console.log(`房间“${room}”已有${peers.length}人加入`);

    const peer = {
      ...userInfo,
      clientId: socket.id,
    };

    // 通知房间内的其他用户有人加入房间
    io.sockets.to(room).emit('peer-join-room', {
      roomId: room,
      peer: peer,
    });

    console.log(`${peer.nickname} 加入房间“${room}”`);
    socket.join(room);

    // 通知用户已加入房间
    socket.emit('joined-room', {
      roomId: room,
      peer: peer,
      peers: peers,
    }); 

    peers.push(peer);
  });

  socket.on('bye', () => {
    console.log('received bye');
  });
});
