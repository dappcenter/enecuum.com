import io from 'socket.io-client';


const socket = io((process.env.dev ? 'http' : 'https') + '://enecuum.com', {
  path: '/socket',
  reconnectionAttempts: 30,
  reconnectionDelay: 3000,
  transports: ['polling']
});

export default socket;
