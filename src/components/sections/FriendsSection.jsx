import React, {useEffect, useState} from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { ScrollingContainer } from '../reusable';
import { UserItem, RequestedFriendItem } from "../reusable/list-items";

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
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
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
              setShowFriends(true);
              setShowFriendReqs(false);
              setSearchTerm("");
              setFilteredFriends(userDetails?.friends ? userDetails?.friends : []);
            }}
            sx={{
              fontSize: 25,
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
              fontSize: 25,
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
                fontSize: 25,
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
          <Stack width="100%">
            <Box sx={{ position: 'relative', backgroundColor: 'white', width: "40%"}}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={showFriends ? "Search friends..." : "Search users..."}
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
