import styles from './MessagingWindow.module.scss';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Card from '../shared/Card';

import TextareaAutosize from 'react-textarea-autosize';

import ProfileImage from '../../assets/images/profile.jpg';

import { useLoggedInUserState } from '../../state/userState';
import { useCurrentRoomInfoState } from '../../state/messageState';
import { ReactComponent as SendIcon } from '../../assets/icons/send.svg';
import { GlobalContext } from '../../state/GlobalContext';
import Icon from '../shared/Icon';
function MessagingWindow() {
  const { socket } = useContext(GlobalContext);
  const { currentRoomInfo } = useCurrentRoomInfoState();
  const [message, setMessage] = useState('');

  const { loggedInUser } = useLoggedInUserState();
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const messagesRef = useRef();
  const textAreaRef = useRef();
  const [sendingMessages, setSendingMessages] = useState(false);
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

    socket.emit('join-room', currentRoomInfo.id, loggedInUser.id);
    socket.on('receive-message', (message, sender) => {
      // console.log(message);
      // console.log(sender);
      // we need a sender since we can chat in a group
      setSendingMessages(false); // so that we don't scroll automatically
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
  }, [currentRoomInfo, loggedInUser.id, socket]);
  const sendMessage = () => {
    setSendingMessages(true);
    socket.emit('send-message', message, currentRoomInfo.id, loggedInUser);
    setMessages((prev) => {
      return [...prev, { body: message, sender: loggedInUser }];
    });
    textAreaRef.current.blur();
    setMessage('');
    setTimeout(() => {
      textAreaRef.current.focus();
    }, 0);
    // console.log(messages);
  };
  // useEffect(() => {
  //   if (sendingMessages) {
  //     messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  //   }
  // }, [sendingMessages, messages]);
  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);
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

      <div className={styles.messages} ref={messagesRef}>
        {messages.map((message, i) => (
          <span
            key={i}
            className={[
              styles.message,
              message.sender.id === loggedInUser.id
                ? styles.sent
                : styles.received,
            ].join(' ')}
          >
            {message.body}
          </span>
        ))}
      </div>
      <div className={styles.inputButtonContainer}>
        <TextareaAutosize
          value={message}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          onChange={(e) => {
            // console.log(e);
            setMessage(e.target.value);
          }}
          maxRows={5}
          className={styles.textArea}
          ref={textAreaRef}
        />
        <div className={styles.sendButton} onClick={sendMessage}>
          <Icon hintText="Press Enter to send" hintPosition="tc">
            <SendIcon />
          </Icon>
        </div>
      </div>
    </div>
  );
}

export default MessagingWindow;
