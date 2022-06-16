// Users array contains all current socket connections
let users = [];
let currentRoomId;

// Functions
function addUser(socketId, userId) {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
}

function removeUser(socketId) {
  users = users.filter(user => user.socketId !== socketId);
}

module.exports = (io, socket) => {
  // Add user
  socket.on('addUser', userId => {
    addUser(socket.id, userId);
  })

  // Disconnect user
  socket.on('disconnect', () => {
    console.log('A user has disconnected...');
    removeUser(socket.id);
  });

  // Join room
  socket.on('joinRoom', roomId => {
    currentRoomId = roomId;
    socket.join(roomId);
  });

  // Leave room
  socket.on('leaveRoom', () => {
    socket.leave(currentRoomId);
    currentRoomId = '';
  })

  // Send and get message
  socket.on('sendMessage', msg => {
    socket.to(msg.roomId).emit('getMessage', msg);
  })
}