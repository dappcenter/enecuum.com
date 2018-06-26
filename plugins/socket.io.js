import io from 'socket.io-client';

console.log(process.env);
const socket = io((process.env.dev ? 'http' : 'https') + '://enecuum.com:8081', {
  path: '/provider',
  reconnectionAttempts: 30,
  reconnectionDelay: 3000
});

export default socket;
