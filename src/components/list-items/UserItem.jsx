import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { requestFriendship, unfriendMember } from "../../utils";

const UserItem = ({ member, showFriends, inGroup, user, userDetails, inMessages, openMessagePage }) => {
  const [requestedFriend, setRequestedFriend] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || !member) return;

    if (userDetails?.requestedFriends?.map(requested => requested._id).includes(member._id)) {
      setRequestedFriend(true);
    }

    if (userDetails?.friends?.map(friend => friend._id).includes(member._id)) {
      setIsFriend(true);
    }

    // eslint-disable-next-line
  }, []);

  const handleRequestFriendship = async (memberId) => {
    if (user?._id !== id) return;

    const success = await requestFriendship(id, memberId);
    if (success) {
      window.location.reload();
    }
  }

  const handleUnfriendMember = async (friendId) => {
    if (user?._id !== id) return;

    const success = await unfriendMember(id, friendId);
    if (success) {
      window.location.reload();
    }
  }

  const manageFriendshipStatus = () => {
    if (requestedFriend) return;

    if (user?._id === id) {
      if (isFriend) {
        handleUnfriendMember(member?._id);
      } else {
        handleRequestFriendship(member?._id);
      }
    }
  }

  return (
    <Box
      onClick={() => {
        if (!inMessages) {
          navigate(`/profile/${member?._id}`);
          window.location.reload();
        } 
      }}
      sx={{
        display: "flex",
        alignItems: 'center',
        padding: {xs: "5px", md: '10px'}, 
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': { padding: {xs: "4.5px", md: '9.5px'} },
        cursor: inMessages ? "default" : 'pointer',
      }}
    >
      <Box
        sx={{ 
          height: {xs: "30px", md: '40px'}, 
          width: {xs: "60px", md: '80px'}, 
          borderRadius: "100%", 
          marginLeft: {xs: "5px", md: '20px'}, 
          marginRight: "10px",
          display: "flex", justifyContent: "center", alignItems: "center",
          overflow: "hidden"
        }}
      >
        <img 
          alt="user profile"
          src={member.image ? member.image : "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"}
          height="100%"
          width="100%"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // to prevent looping
            currentTarget.src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
          }}
        />
      </Box>

      <Box component="span" 
        sx={{ 
          fontSize: {xs: "16px", md: '20px'}, 
          width: '300px' 
        }}
      >
        {member?.userName}
      </Box>

      {user._id === id && !inGroup && userDetails ? (
        <Box sx={{ width: '90%', display: 'flex', justifyContent: 'flex-end', paddingRight: '15px'}}>
          {inMessages ? (
            <Typography
              onClick={(e) => {
                e.stopPropagation();
                openMessagePage(member._id);
              }}
              sx={{
                padding: '5px 10px',
                borderRadius: "10%",
                fontSize: {xs: "14px", md: '18px'},
                backgroundColor: "#efebe9",
                cursor: 'pointer'
              }}
            >
              Message
            </Typography>
          ) : (
            <Typography
              onClick={(e) => {
                e.stopPropagation();
                if (requestedFriend) return;
                manageFriendshipStatus();
              }}

              sx={{
                padding: '5px 10px',
                borderRadius: "10%",
                cursor: user?._id === id && !requestedFriend ? 'pointer': 'default',
                opacity: '0.70',
                ":hover": { opacity: user?._id === id && !requestedFriend ? '1' : '0.70'},
                fontSize: {xs: "14px", md: '18px'}, 
                color: "black",
                backgroundColor: "#efebe9",
              }}
            >
              {isFriend 
                ? "unfriend" 
                : requestedFriend
                ? "requested"
                : "befriend"
              }
            </Typography>
          )}
        </Box>
      ) : (
        null
      )}
      
    </Box>
  );
}

export default UserItem;
