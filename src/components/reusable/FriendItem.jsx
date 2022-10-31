import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { requestFriendship, unfriendMember } from "../../utils";

const FriendItem = ({ member, showFriends, user, userDetails, inMessages, handleClickedFriend }) => {
  const {id} = useParams();
  const navigate = useNavigate();

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

  return (
    <Box
      key={member?._id}
      onClick={() => {
        if (!inMessages) {
          navigate(`/profile/${member?._id}`);
          window.location.reload();
        } 
      }}
      sx={{
        display: "flex",
        alignItems: 'center',
        padding: "10px",
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': { borderTop: '3px solid #382110', borderBottom: '3px solid #382110'},
        cursor: inMessages ? "default" : 'pointer',
      }}
    >
      <img 
        alt="user profile picture"
        src={member.image}
        height="40px"
        width="40px"
        style={{ borderRadius: "100%", margin: '0 15px 0 10px'}}
      />

      <Box component="span" 
        sx={{ fontSize: 20, width: '300px' }}
      >
        {member?.userName}
      </Box>

      {user._id === id ? (
        <Box sx={{ width: '90%', display: 'flex', justifyContent: 'flex-end', paddingRight: '15px'}}>
          {inMessages ? (
            <Typography
              onClick={(e) => {
                e.stopPropagation();
                console.log("open message modal")
                handleClickedFriend(member._id);
              }}
              sx={{
                padding: '5px 10px',
                borderRadius: "10%",
                fontSize: '18px',
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
                if (user?._id === id) {
                  if (showFriends) {
                    handleUnfriendMember(member?._id);
                  } else {
                    handleRequestFriendship(member?._id);
                  }
                }
              }}
              sx={{
                padding: '5px 10px',
                borderRadius: "10%",
                cursor: user?._id === id ? 'pointer': 'default',
                opacity: '0.70',
                ":hover": { opacity: user?._id === id ? '1' : '0.70'},
                fontSize: '18px',
                color: userDetails?.friends?.map(friend => friend._id).includes(member._id) ? "black" : "white",
                backgroundColor: userDetails?.friends?.map(friend => friend._id).includes(member._id) ? "#efebe9" : "#3e2723",
              }}
            >
              {userDetails?.friends?.map(friend => friend._id).includes(member._id) 
                ? "unfriend" 
                : userDetails?.requestedFriends?.map(requested => requested._id).includes(member._id)
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

export default FriendItem;
