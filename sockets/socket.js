// /mensajes de socket

const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Quee'));
bands.addBand(new Band('Bajo dreams'));
bands.addBand(new Band('heoroes del silencio'));

io.on('connection', (client) => {
	client.emit('active-bands', bands.getBands());

	console.log('cliente conectado');
	client.on('disconnect', () => {
		console.log('cliente desconectado');
	});

	client.on('mensaje', (data) => {
		console.log(data);
		io.emit('mensaje', {
			admin: 'Nuevo mensaje'
		});
	});

	client.on('emitir-mensaje', (payload) => {
		client.broadcast.emit('nuevo-mensaje', payload);
	});

	client.on('vote-band', (payload) => {
		bands.voteBand(payload.id);
		io.emit('active-bands', bands.getBands());
	});

	client.on('add-band', (payload) => {
		const newBand = new Band(payload.name);
		bands.addBand(newBand);
		io.emit('active-bands', bands.getBands());
	});
	client.on('delete-band', ({ id }) => {
		bands.deleteBand(id);
		io.emit('active-bands', bands.getBands());
	});
});
