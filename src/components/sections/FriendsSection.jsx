import React, {useEffect, useState} from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { ScrollingContainer } from '../reusable';
import { UserItem, RequestedFriendItem } from "../list-items";

const FriendsSection = () => {
  const { allUsers, userDetails, user } = useGlobalStore();

  const {id} = useParams();

  const [showFriends, setShowFriends] = useState(true);
  const [showFriendReqs, setShowFriendReqs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(userDetails?.friends ? userDetails?.friends : []);
  const [filteredMembers, setFilteredMembers] = useState(allUsers.filter((member) => member?._id !== id));

  useEffect(() => {
    if (showFriends) {
      if (!userDetails?.friends) {
        setFilteredFriends([]);
      } else {
        setFilteredFriends(() => userDetails?.friends.filter((friend) => friend.userName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())));
      }
    } else {
      setFilteredMembers(() => allUsers.filter((member) => member?._id !== id).filter((member) => member.userName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())));
    }

    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <Stack
      id="friends_section"
      width="100vw"
      minHeight="100vh"
      height="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginBottom="100px"
      sx={{ 
        paddingTop: {xs: "70px", md: "0"}
      }}
      border="1px solid black"
    >
      <Stack
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: {xs: "10px", md: "30px"},
          width: {xs: "auto", md: "50%"}
        }}
      >
        <Box sx={{ display: 'flex', marginBottom: {xs: "15px", md: "30px"}}}>
          <Typography
            onClick={() => {
              setShowFriends(true);
              setShowFriendReqs(false);
              setSearchTerm("");
              setFilteredFriends(userDetails?.friends ? userDetails?.friends : []);
            }}
            sx={{
              fontSize: {xs: "18px", md: "20px"},
              textDecoration: showFriends && !showFriendReqs ? 'underline' : 'none',
              margin: '0 20px',
              color: '#382110',
              fontWeight: '300',
              cursor: 'pointer',
            }}
          >
            friends
          </Typography>
          <Typography
            onClick={() => {
              setShowFriends(false);
              setShowFriendReqs(false);
              setSearchTerm("");
              setFilteredMembers(allUsers.filter((member) => member?._id !== id));
            }}
            sx={{
              fontSize: {xs: "18px", md: "20px"},
              textDecoration: !showFriends && !showFriendReqs ? 'underline' : 'none',
              margin: '0 20px',
              color: '#382110',
              fontWeight: '300',
              cursor: 'pointer',
            }}
          >
            users
          </Typography>
          {user._id === id ? (
            <Typography
              onClick={() => {
                setShowFriendReqs(true);
              }}
              sx={{
                fontSize: {xs: "18px", md: "20px"},
                textDecoration: showFriendReqs ? 'underline' : 'none',
                margin: '0 20px',
                color: '#382110',
                fontWeight: '300',
                cursor: 'pointer',
              }}
            >
              requests
            </Typography>
          ) : (
            null
          )}
        </Box>

        {!showFriendReqs && 
          <Stack width="100%" maxWidth="600px">
            <Box sx={{ position: 'relative', backgroundColor: 'white', width: {xs: "70%", md: "50%"}}}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={showFriends ? "Search friends..." : "Search users..."}
                style={{
                  position: "relative",
                  width: "80%",
                  height: '100%',
                  padding: "5px 5px",
                  fontSize: '16px',
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
                  top: "5px",
                }}
              />
            </Box>
            
          </Stack>
        }
        
      </Stack>
      
      {showFriends && !showFriendReqs ? (
        <ScrollingContainer>
          {filteredFriends.length
            ? filteredFriends.map((friend) => (
                <UserItem 
                  key={friend._id}
                  user={user}
                  userDetails={userDetails}
                  showFriends={showFriends}
                  member={friend}
                />
              ))
            : null
          }

          {/* If no search results */}
          {!filteredFriends.length && searchTerm.length 
            ? <Typography 
                width="100%" height="100%" display="flex" justifyContent="center" 
                alignItems="center" fontSize={20} color="#382110"
              >
                No Results
              </Typography>
            : null
          }

          {/* If no friends */}
          {!filteredFriends.length && !searchTerm.length 
            ? <Typography 
                width="100%" height="100%" display="flex" justifyContent="center" 
                alignItems="center" fontSize={20} color="#382110"
              >
                You have no friends
              </Typography>
            : null
          }
        </ScrollingContainer>
      ) : null}

      {!showFriends && !showFriendReqs ? (
        <ScrollingContainer>
          {filteredMembers.length 
            ? filteredMembers.map((member) => (
                <UserItem 
                  key={member._id}
                  user={user}
                  userDetails={userDetails}
                  showFriends={showFriends}
                  member={member}
                />
              ))
            : null
          }

          {/* If no search results */}
          {!filteredMembers.length && searchTerm.length 
            ? <Typography 
                width="100%" height="100%" display="flex" justifyContent="center" 
                alignItems="center" fontSize={20} color="#382110"
              >
                No Results
              </Typography>
            : null
          }

          {/* If no users */}
          {!filteredMembers.length && !searchTerm.length
            ? <Typography 
                width="100%" height="100%" display="flex" justifyContent="center" 
                alignItems="center" fontSize={20} color="#382110"
              >
                This application has no other members
              </Typography>
            : null
          }
        </ScrollingContainer>
      ): null}

      {showFriendReqs ? (
        <ScrollingContainer>
          {userDetails?.friendRequests?.length
            ?  userDetails.friendRequests?.map((friendReq) => (
                <RequestedFriendItem key={friendReq._id} member={friendReq} user={user} />
              ))
            : null
          }

          {!userDetails?.friendRequests?.length
            ? <Typography 
                width="100%" height="100%" display="flex" justifyContent="center" 
                alignItems="center" fontSize={20} color="#382110"
              >
                No Requests
              </Typography>
            : null
          }
        </ScrollingContainer>
      ): null}

    </Stack>
  );
}

export default FriendsSection;
