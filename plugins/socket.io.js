import io from 'socket.io-client';

const socket = io((process.env.dev ? 'http' : 'https') + '://enecuum.com:8081', {
  path: '/io',
  reconnectionAttempts: 30,
  reconnectionDelay: 3000
});

export default socket;
