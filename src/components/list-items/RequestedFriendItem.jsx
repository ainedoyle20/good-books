import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { acceptFriendRequest } from "../../utils";

const RequestedFriendItem = ({ member, user }) => {
  const {id} = useParams();

  const handleAcceptFriendReq = async (memberId) => {
    if (user?._id !== id) return;

    const success = await acceptFriendRequest(user._id, memberId);
    if (success) {
      window.location.reload();
    }
  }

  return (
    <Box
      key={member?._id}
      sx={{
        display: "flex",
        alignItems: 'center',
        padding: "10px",
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': { padding: "9.5px" },
      }}
    >
      <img 
        alt="user profile"
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

      <Box 
        sx={{ 
          width: '90%', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          paddingRight: '15px'
        }}
      >
        <Typography
          onClick={() => handleAcceptFriendReq(member._id)}
          sx={{
            padding: '5px 10px',
            borderRadius: "10%",
            opacity: '0.70',
            fontSize: '18px',
            color: "black",
            backgroundColor: "#efebe9",
            cursor: 'pointer'
          }}
        >
          Accept
        </Typography>
      </Box>
      
    </Box>
  );
}

export default RequestedFriendItem;
