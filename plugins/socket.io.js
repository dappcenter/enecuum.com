import io from 'socket.io-client';

console.log(process.env);
const socket = io((process.env.dev ? 'http' : 'https') + '://enecuum.com', {
  path: '/provider',
  reconnectionAttempts: 30,
  reconnectionDelay: 3000
});

export default socket;
