import io from 'socket.io-client';

const socket = io((process.env.dev ? 'http' : 'https') + '://airdrop.enecuum.com' + (process.env.dev ? ':8081' : ''), {
  path: '/io',
  reconnectionAttempts: 30,
  reconnectionDelay: 3000
});

export default socket;
