import styles from './MessagingWindow.module.scss';
import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';

import TextareaAutosize from 'react-textarea-autosize';
import io from 'socket.io-client';
import ProfileImage from '../../assets/images/profile.jpg';

import { useLoggedInUserState } from '../../state/userState';
import { useCurrentRoomInfoState } from '../../state/messageState';
import { ReactComponent as SendIcon } from '../../assets/icons/send.svg';
function MessagingWindow() {
  const { currentRoomInfo } = useCurrentRoomInfoState();
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState();
  const { loggedInUser } = useLoggedInUserState();
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    // console.log(currentRoomInfo);

    setMessages(
      currentRoomInfo.messages.map((message) => {
        return {
          body: message.body,
          sender: message.sender,
        };
      })
    );
    setMembers(
      currentRoomInfo.users.map((user) => ({
        ...user,
        chatIsOpen: user.id === loggedInUser.id ? true : false,
      }))
    );
    const socket = io(process.env.REACT_APP_SERVER_URL);
    socket.on('connect', () => {
      // console.log('you connected with id : ' + socket.id);
      socket.emit('join-room', currentRoomInfo.id, loggedInUser.id);
      socket.on('receive-message', (message, sender) => {
        // console.log(message);
        // console.log(sender);
        // we need a sender since we can chat in a group
        setMessages((prev) => {
          return [...prev, { body: message, sender }];
        });
      });
      socket.on('member-joined-chat', (joinerId) => {
        setMembers((prev) => {
          const updated = [];
          prev.forEach((member) => {
            if (member.id === joinerId) {
              updated.push({
                ...member,
                chatIsOpen: true,
              });
            } else {
              updated.push(member);
            }
          });
          return updated;
        });
      });
    });

    setSocket(socket);
  }, [currentRoomInfo, loggedInUser.id]);
  const sendMessage = () => {
    socket.emit('send-message', message, currentRoomInfo.id, loggedInUser);
    setMessages((prev) => {
      return [...prev, { body: message, sender: loggedInUser }];
    });
    // console.log(messages);
  };
  return (
    <div
      className={styles.messagingWindow}
      onClick={(e) => {
        e.stopPropagation();
        console.log(members);
      }}
    >
      <div className={styles.controls}>
        <div className={styles.card}>
          <Card image={ProfileImage}>
            <div className={styles.info}>
              <div className={styles.username}>
                {members
                  .filter((member) => member.id !== loggedInUser.id)
                  .map((member) => member.username)
                  .join(', ')}
                <i className="fa fa-angle-down"></i>
              </div>
              <div className={styles.activeStatus}>Active now</div>
            </div>
          </Card>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map((message, i) => (
          <p
            key={i}
            className={[
              styles.message,
              message.sender.id === loggedInUser.id
                ? styles.sent
                : styles.received,
            ].join(' ')}
          >
            {message.body}
          </p>
        ))}
      </div>
      <div className={styles.inputButtonContainer}>
        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxRows={5}
          className={styles.textArea}
        />
        <div className={styles.sendButton} onClick={sendMessage}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

export default MessagingWindow;
