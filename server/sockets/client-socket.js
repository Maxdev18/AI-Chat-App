module.exports = socket => {
  // Test socket connection
  let date;
  setInterval(() => {
    date = new Date;
    socket.emit('connect', date);
  }, 1000);
  
  
}