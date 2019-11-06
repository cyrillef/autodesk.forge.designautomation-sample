/*jshint esversion: 8 */

const app = require('./routes/server');
const socketIO = require('./routes/socket.io')(app);

let server = socketIO.http.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

server.on('error', (err) => {
    if (err.errno === 'EACCES') {
        console.error(`Port ${app.get('port')} already in use.\nExiting...`);
	    process.exit (1) ;
	}
}) ;
