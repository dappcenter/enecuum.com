import io from 'socket.io-client';

const socket = io('//', {
  path: '/io',
  reconnectionAttempts: 30,
  reconnectionDelay: 3000
});

export default socket;
