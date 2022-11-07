import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { ScrollingContainer } from '../reusable';
import { MessageItem } from '../reusable/list-items';
import { UserItem } from "../reusable/list-items";

const MessagesSection = () => {
  const { user, userDetails } = useGlobalStore();
  const navigate = useNavigate();

  const [showMessages, setShowMessages] = useState(true);
  const [messageObjects, setMessageObjects] = useState([])
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!userDetails) return;

    const { messagedUsers, friends } = userDetails;

    if (messagedUsers?.length) setMessageObjects(messagedUsers);
    if (friends?.length) setFilteredFriends(friends);

  }, [userDetails, showMessages]);

  useEffect(() => {
    if (!userDetails) return;

    const { messagedUsers, friends } = userDetails;

    if (!messagedUsers?.length || !friends?.length) return;

    if (showMessages && messagedUsers?.length) { // filtering messagedUsers

      const filteredMessagedUsers = messagedUsers.filter(messageObj => (
        messageObj.messageFriend.userName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      ));
      setMessageObjects(filteredMessagedUsers);

    } else if (!showMessages && friends?.length) { // filtering friends

      const filtered = friends.filter((friend) => (
        friend.userName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      ));
      setFilteredFriends(filtered);

    }

  }, [searchTerm, userDetails, showMessages]);

  const openMessagePage = (friendId) => navigate(`/messages/${friendId}`);

  return (
    <Stack
      id="messages_section"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >

      <Stack 
        width="50%" display="flex" justifyContent="center" alignItems="center" marginBottom="30px"
      >
        <Box sx={{ display: 'flex', marginBottom: "30px"}}>
          <Typography
            margin="0 20px" color="#382110" fontWeight="300" fontSize="25px"
            sx={{ textDecoration: showMessages ? 'underline' : 'none', cursor: 'pointer' }}
            onClick={() => {
              setShowMessages(true);
              setSearchTerm("");
            }}
          >
            messages
          </Typography>
          <Typography
            margin="0 20px" color="#382110" fontWeight="300" fontSize="25px"
            sx={{ textDecoration: !showMessages ? 'underline' : 'none', cursor: 'pointer' }}
            onClick={() => {
              setShowMessages(false);
              setSearchTerm("");
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
      
      {/* Listing friends user has messaged */}
      {showMessages ? (
        <ScrollingContainer>
          {messageObjects.length 
            ? messageObjects.map((messageObject) => (
              <MessageItem
                key={messageObject._key}
                message={messageObject}
                openMessagePage={openMessagePage}
              />
            ))
            : null
          }

          {!messageObjects.length && !searchTerm.length ? (
            <Typography 
              width="100%" height="100%" display="flex" 
              justifyContent="center" alignItems="center"
            >
              You have not messaged any of your friends 
            </Typography>
          ): null}

          {!messageObjects.length && searchTerm.length ? (
            <Typography 
              width="100%" height="100%" display="flex" 
              justifyContent="center" alignItems="center"
            >
              No Results
            </Typography>
          ) : null}

        </ScrollingContainer>
      ) : null}

      {/* Listing Friends (both messaged and not) */}
      {!showMessages ? (
        <ScrollingContainer>
          {filteredFriends.length 
            ? filteredFriends.map((friend) => (
              <UserItem
                key={friend._id}
                member={friend}
                user={user}
                userDetails={userDetails}
                inMessages={true}
                openMessagePage={openMessagePage}
              />
            ))
            : null
          }

          {!filteredFriends.length && !searchTerm.length
            ? <Box 
                width="100%" height="100%" display="flex" flexDirection="column"
                justifyContent="center" alignItems="center"
              >
                <Typography>You have no Friends </Typography>
                <Typography>Search Users in Friends Section and befriend some!</Typography>
              </Box>

            : !filteredFriends.length && searchTerm.length 
              ? <Typography 
                  width="100%" height="100%" display="flex" 
                  justifyContent="center" alignItems="center"
                >
                  No Results
                </Typography>
              : null
          }
        </ScrollingContainer>
      ) : null}

    </Stack>
  );
}

export default MessagesSection;
