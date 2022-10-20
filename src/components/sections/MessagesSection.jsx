import React, {useRef, useState, useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { FriendItem, MessageItem, MessageModal } from '../reusable';
import { createMessageObject, fetchUserDetails } from '../../utils';

const MessagesSection = () => {
  const { user, userDetails, addUserDetails, navSection } = useGlobalStore();
  const {id} = useParams();
  const ref = useRef();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageObject, setMessageObject] = useState(null);
  const [showMessages, setShowMessages] = useState(true);
  const [filteredMessageFriends, setFilteredMessageFriends] = useState(userDetails?.messages || [])
  const [filteredFriends, setFilteredFriends] = useState(userDetails?.friends || []);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (showMessages && userDetails?.messages) {
      setFilteredMessageFriends(
        userDetails?.messages?.filter((messageObj) => (
          messageObj.messageFriend.userName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        ))
      );
    } else {
      if (!userDetails?.friends) {
        setFilteredFriends([]);
      } else {
        setFilteredFriends(
          userDetails?.friends.filter((friend) => (
            friend.userName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
          ))
        );
      }
    }
    
  }, [searchTerm])

  const scroll = (scrollOffset) => {
    ref.current.scrollTop += scrollOffset;
  };

  const checkIfMessaged = (friendId) => {
    let returnObj = {messaged: false, messageObj: null};

    const messageObjects = userDetails?.messages;

    if (!messageObjects || !messageObjects?.length) {
      return returnObj;
    }

    messageObjects.map((messageObj) => {
      if (messageObj?.messageFriend?._id === friendId) {
        returnObj = {messaged: true, messageObj };;
      }
      return messageObj;
    });

    return returnObj;
  }

  const handleClickedFriend = async (friendId) => {
    const { messaged, messageObj } = checkIfMessaged(friendId);
    console.log("messaged: ", messaged, "messageObj: ", messageObj);

    if (messaged) {
      setMessageObject(messageObj)
      
    } else {
      const messageKey = await createMessageObject(user._id, friendId);
      
      if (messageKey) {
        const updatedUserDetails = await fetchUserDetails(user._id, addUserDetails);
        console.log("updatedUserDetails: ", updatedUserDetails?.messages);
        const message = updatedUserDetails?.messages?.filter((obj) => (
          obj._key === messageKey
        ));
        console.log("message[0]: ", message[0]);

        setMessageObject(message[0] || null);
      }
    }

    setShowMessageModal(true);
  } 

  const handleClickedMessagedFriend = async (messageObj) => {
    setMessageObject(messageObj);
    setShowMessageModal(true);
  }

  return (
    <Stack
      id="messages_section"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      
      {!showMessageModal ? (
        <>
          <Stack width="50%" 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginBottom: '30px'
            }}
          >
            <Box sx={{ display: 'flex', marginBottom: "30px"}}>
              <Typography
                onClick={() => {
                  setShowMessages(true);
                  setSearchTerm("");
                  setFilteredMessageFriends(userDetails?.messages || []);
                }}
                sx={{
                  fontSize: 25,
                  textDecoration: showMessages ? 'underline' : 'none',
                  margin: '0 20px',
                  color: '#382110',
                  fontWeight: '300',
                  cursor: 'pointer',
                }}
              >
                messages
              </Typography>
              <Typography
                onClick={() => {
                  setShowMessages(false);
                  setSearchTerm("");
                  setFilteredFriends(userDetails?.friends || []);
                }}
                sx={{
                  fontSize: 25,
                  textDecoration: !showMessages ? 'underline' : 'none',
                  margin: '0 20px',
                  color: '#382110',
                  fontWeight: '300',
                  cursor: 'pointer',
                }}
              >
                friends
              </Typography>
            </Box>

            <Stack direction="row" width="100%" sx={{ display: 'flex', alignItems: 'center'}}>
              <Box sx={{ position: 'relative', backgroundColor: 'white', width: "40%"}}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  style={{
                    position: "relative",
                    width: "80%",
                    height: '100%',
                    padding: "10px 5px",
                    fontSize: '18px',
                    outline: 'none',
                    border: 'none',
                  }}
                />

                <img
                  src="https://s.gr-assets.com/assets/layout/header/icn_nav_search.svg"
                  alt="search"
                  height="20px"
                  width="20px"
                  style={{ 
                    position: 'absolute',
                    right: 10,
                    top: "10px",
                  }}
                />
              </Box>
            </Stack>
          </Stack>

          <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginBottom: 2}}
            onClick={() => scroll(-390)}
          >
            <BsChevronBarUp />
          </Box>

          <Stack
            ref={ref}
            sx={{
              borderRight: '1px solid #382110',
              borderLeft: '1px solid #382110',
              padding: '15px 0',
              width: '50%',
              height: '400px',
              overflowY: 'scroll',
              '&::-webkit-scrollbar':{
                width:0,
              }
            }}
            
          >
            {showMessages ? (
              filteredMessageFriends?.length ?
                filteredMessageFriends.map((message) => (
                  <MessageItem
                    key={message._key}
                    message={message}
                    handleClickedMessagedFriend={handleClickedMessagedFriend}
                  />
                )) 
              : <Typography
                  width="100%"
                  height="100%"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    color: '#382110'
                  }}
                >
                  No Results
                </Typography>       
              ) : null   
            }

            {!showMessages ? (
              filteredFriends.length ? (
                filteredFriends.map((friend) => (
                  <FriendItem 
                    key={friend._id}
                    member={friend}
                    user={user}
                    userDetails={userDetails}
                    inMessages={true}
                    handleClickedFriend={handleClickedFriend}
                  />
                ))
              ) :  (
                <Typography
                  width="100%"
                  height="100%"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    color: '#382110'
                  }}
                >No Results</Typography> 
              ) 
              ) : null
            }
          </Stack> 
          
          
          <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginTop: 2}}
            onClick={() => scroll(390)}
          >
            <BsChevronBarDown />
          </Box>
        </>
      ) : (
        messageObject ? (
          <MessageModal 
            user={user}
            messageObj={messageObject}
            setShowMessageModal={setShowMessageModal}
          />
        ): null
      )}

  </Stack>
  );
}

export default MessagesSection;
