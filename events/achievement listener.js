const { client, config, database} = require('../index')
var ioClient = require('socket.io-client');
const { raw } = require('body-parser');

var Websocket = ioClient("http://192.168.0.34:3000")

Websocket.on('connect', function(){
    console.log("Achievement System connnection active!")
})


client.on("raw", packet => {
    Websocket.emit("event", packet)
})


Websocket.connect()