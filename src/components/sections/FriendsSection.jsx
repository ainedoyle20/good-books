import React, {useEffect, useRef, useState} from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { FriendItem, ReqFriendItem } from '../reusable'
import { test } from '../../utils';

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

  }, [searchTerm]);

  // useEffect(() => {
  //   console.log('testing')
  //   test();
  // }, [])

  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollTop += scrollOffset;
  };

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
              requested
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

      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginBottom: 2}}
        onClick={() => scroll(-390)}
      >
        <BsChevronBarUp />
      </Box>

      <Stack
        ref={scrollRef}
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
        {showFriends && !showFriendReqs ? 
          filteredFriends.length ?
            filteredFriends.map((friend) => (
              <FriendItem 
                key={friend._id}
                user={user}
                userDetails={userDetails}
                showFriends={showFriends}
                member={friend}
              />
            )) 
          : userDetails?.friends && userDetails?.friends?.length ? (
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
              >
                No friends matching &#8220;{searchTerm}&#8221;
              </Typography> 
            ) : (
              <Stack
                width="100%"
                height="100%"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                 sx={{
                  fontSize: 20,
                  color: '#382110'
                 }}
                >
                  {user?._id === id ? "You have no friends" : "This user has no friends"} 
                </Typography>
                {user?._id === id && (
                  <Typography
                    sx={{
                      fontSize: 20,
                      color: '#382110'
                    }}
                  >
                    Search users and befriend some!
                  </Typography>
                )}
              </Stack>
            )      
          : null   
        }

        {!showFriends && !showFriendReqs ? (
          filteredMembers.length ? (
            filteredMembers.map((member) => (
              <FriendItem 
                key={member._id}
                user={user}
                userDetails={userDetails}
                showFriends={showFriends}
                member={member}
              />
            ))
          ) : allUsers.length ? (
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
            >No users matching &#8220;{searchTerm}&#8221;</Typography> 
          ) : (
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
            >This application has no other members</Typography>
          )
          ) : null
        }

        {showFriendReqs 
          ? userDetails.friendRequests?.map((friendReq) => (
            <ReqFriendItem key={friendReq._id} member={friendReq} user={user} />
          ))
          : null
        }
      </Stack>  
      
      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginTop: 2}}
        onClick={() => scroll(390)}
      >
        <BsChevronBarDown />
      </Box>
    </Stack>
  );
}

export default FriendsSection;
