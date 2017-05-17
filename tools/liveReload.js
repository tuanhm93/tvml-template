import io from 'socket.io-client';

export function connect(options) {
	const baseURL = options.baseURL;
	const socket = io(baseURL);
	socket.on('connect', () => {
		console.debug('liveReload: Connected');
	});

	socket.on('compile', () => {
		console.debug('liveReload: Compiling');
	});

	socket.on('live-reload', () => {
		console.debug('liveReload: Reloading');
		App.reload({when: 'now'});
	})
}