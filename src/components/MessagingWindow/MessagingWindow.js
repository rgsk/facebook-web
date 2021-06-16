import styles from './MessagingWindow.module.scss';
import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';
import { useLoggedInUserState } from '../../state/userState';
import { useCurrentRoomInfoState } from '../../state/messageState';
function MessagingWindow() {
  const { currentRoomInfo } = useCurrentRoomInfoState();
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState();
  const { loggedInUser } = useLoggedInUserState();
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // console.log(currentRoomInfo);
    const sentM = [];
    const recM = [];
    currentRoomInfo.messages.forEach((detail) => {
      if (detail.sender.id === loggedInUser.id) {
        sentM.push(detail.body);
      } else {
        recM.push(detail.body);
      }
    });

    setSentMessages(sentM);
    setReceivedMessages(recM);
    const socket = io(process.env.REACT_APP_SERVER_URL);
    socket.on('connect', () => {
      // console.log('you connected with id : ' + socket.id);
      socket.emit('join-room', currentRoomInfo.id, (message) => {
        // console.log(message);
      });
      socket.on('receive-message', (message, sender) => {
        // console.log(message);
        // console.log(sender);
        // we need a sender since we can chat in a group
        setReceivedMessages((prev) => {
          return [...prev, message];
        });
      });
    });

    setSocket(socket);
  }, [currentRoomInfo, loggedInUser.id]);
  return (
    <div
      className={styles.messagingWindow}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button
          onClick={() => {
            socket.emit(
              'send-message',
              message,
              currentRoomInfo.id,
              loggedInUser
            );
            setSentMessages((prev) => {
              return [...prev, message];
            });
          }}
        >
          send
        </button>
      </div>
      <div className={styles.messages}>
        <div className={styles.receivedMessages}>
          {receivedMessages.map((message, i) => (
            <p key={i} className={styles.message}>
              {message}
            </p>
          ))}
        </div>
        <div className={styles.sentMessages}>
          {sentMessages.map((message, i) => (
            <p key={i} className={styles.message}>
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessagingWindow;
