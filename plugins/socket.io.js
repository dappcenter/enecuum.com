import io from 'socket.io-client';

const socket = io((process.env.dev ? 'http' : 'https') + '://enecuum.com', {transports: ['polling']});

export default socket;
