import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:9000');
const userSocket = io('http://localhost:9000/user', {
  auth: { token: '' },
});
userSocket.on('connect_error', (error) => {
  console.log(error.message);
});
socket.on('connect', () => {
  console.log('you connected with id : ' + socket.id);
});
socket.on('receive-message', (message) => {
  console.log(message);
});
let count = 0;

const Landing = () => {
  useEffect(() => {
    setInterval(() => {
      socket.volatile.emit('ping', count);
      count++;
    }, 1000);
  }, []);
  const [message, setMessage] = useState();
  const [room, setRoom] = useState();
  return (
    <div>
      <h1>Landing</h1>
      <Link to="/users">users</Link>
      <div>
        <span>Message</span>{' '}
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          onClick={() => {
            socket.emit('send-message', message, room);
          }}
        >
          send
        </button>
        <span>Room</span>{' '}
        <input value={room} onChange={(e) => setRoom(e.target.value)} />
        <button
          onClick={() => {
            socket.emit('join-room', room, (message) => {
              console.log(message);
            });
          }}
        >
          join
        </button>
        <div>
          <button
            onClick={() => {
              socket.connect();
            }}
          >
            connect
          </button>
          <button
            onClick={() => {
              socket.disconnect();
            }}
          >
            disconnect
          </button>
        </div>
      </div>
    </div>
  );
};
export default Landing;
