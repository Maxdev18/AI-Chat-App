let users = [];

function addUser(socketId, userId) {
  !users.some(user => user.userId !== userId) &&
    users.push({ userId, socketId });
}

module.exports = socket => {
  socket.emit('connection', socket.id);

  // Add user
  socket.on('addUser', userId => {
    addUser(socket.id, userId);
    socket.emit('getUsers', users);
  })
}