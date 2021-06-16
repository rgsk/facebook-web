import React, { useEffect, useState } from 'react';
import Card from '../shared/Card';

import styles from './Contacts.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as VideoCameraIcon } from '../../assets/icons/video-camera.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { CSSTransition } from 'react-transition-group';
import { gql, useQuery, useMutation } from '@apollo/client';
import ProfileImage from '../../assets/images/profile.jpg';
import Icon from '../shared/Icon';
import ContactHoverCard from './ContactHoverCard';
import './Contacts.scss';
import { useLoggedInUserState } from '../../state/userState';
import { useCurrentRoomInfoState } from '../../state/messageState';
const USERS_QUERY = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
    }
  }
`;
const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($userIds: [ID]) {
    createRoom(userIds: $userIds) {
      id
      users {
        id
        username
      }
      messages {
        id
        body
        sender {
          id
          username
        }
      }
      identifier
    }
  }
`;
function Contacts() {
  const [createRoom] = useMutation(CREATE_ROOM_MUTATION);
  const { setCurrentRoomInfo } = useCurrentRoomInfoState();

  const [isHovered, setIsHovered] = useState(false);
  const [topOffsetContact, setTopOffsetContact] = useState(0);
  const [hoveredContact, setHoveredContact] = useState('');
  const [prevHoveredContact, setPrevHoveredContact] = useState(hoveredContact);
  const { loading, error, data } = useQuery(USERS_QUERY);
  const { loggedInUser } = useLoggedInUserState();
  const updateTopOffsetContact = (e, contact) => {
    const rect = e.target.getBoundingClientRect();
    setTopOffsetContact(rect.y + rect.height / 2);

    setHoveredContact(contact);
  };
  useEffect(() => {
    if (hoveredContact !== '') setPrevHoveredContact(hoveredContact);
  }, [hoveredContact]);
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div
      className={styles.contactsBlock + (isHovered ? ' scrollBar' : '')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.title} style={{ paddingTop: '1rem' }}>
        Sponsored
      </div>
      <div className={styles.line}></div>
      <div className={styles.head}>
        <div className={styles.title}>Contacts</div>
        <div className={styles.mid}></div>
        <div className={styles.icons}>
          <Icon hintText="New Room" hintPosition="bl">
            <VideoCameraIcon />
          </Icon>
          <Icon hintText="Search for a name or group" hintPosition="bl">
            <SearchIcon />
          </Icon>
          <Icon hintText="Options" hintPosition="bl">
            <MoreIcon />
          </Icon>
        </div>
      </div>
      <div
        onMouseLeave={() => {
          setHoveredContact('');
        }}
      >
        {data.getAllUsers.map((user) => {
          if (user.id !== loggedInUser.id) {
            return (
              <div
                key={user.id}
                onMouseEnter={(e) => updateTopOffsetContact(e, user.username)}
                onClick={async (e) => {
                  e.stopPropagation();
                  const response = await createRoom({
                    variables: {
                      userIds: [user.id, loggedInUser.id],
                    },
                  });
                  // console.log(response);
                  setCurrentRoomInfo(response.data.createRoom);
                }}
              >
                <Card image={ProfileImage}>{user.username}</Card>
              </div>
            );
          } else {
            return null;
          }
        })}

        <CSSTransition
          in={hoveredContact !== ''}
          timeout={1000}
          classNames="contact"
          unmountOnExit
          style={{
            top: topOffsetContact + 'px',
            position: 'fixed',
            transform: 'translate(-100%, -50%)',
            paddingRight: '10px',
          }}
        >
          <div>
            <ContactHoverCard image={ProfileImage} name={prevHoveredContact} />
          </div>
        </CSSTransition>
      </div>

      <div className={styles.line}></div>
      <div>
        <div className={styles.title}>Group conversations</div>
        <div style={{ padding: '.5rem 0' }}>
          <Card icon={<PlusIcon />}>Create New Group</Card>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
