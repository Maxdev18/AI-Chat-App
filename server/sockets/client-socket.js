module.exports = socket => {
  // Test socket connection
  let date;
  setInterval(() => {
    date = new Date;
    socket.emit('connectTo', date);
  }, 1000);
}