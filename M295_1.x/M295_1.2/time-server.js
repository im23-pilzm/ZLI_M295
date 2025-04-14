const net = require("net");
const strftime = require("strftime");



const server = net.createServer(function (socket) {
    const now = new Date();
    const timeString = strftime("%Y-%m-%d %H:%M\n", now);
    socket.end(timeString)
});
server.listen(Number(process.argv[2]))