const express = require('express');
const app = express();

const path = require('path');
require('dotenv').config();

//crear nuestro socket server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');
//publicar un directorio
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (e) => {
	if (e) throw new Error(e);
	console.log(`servidor corriendo en el puerto:${process.env.PORT}`);
});
