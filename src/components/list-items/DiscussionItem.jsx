import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DiscussionItem = ({ discussion }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/discussion/${discussion._id}`)}
      sx={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingY: "10px",
        paddingRight: "10px",
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': { paddingY: "9.5px" },
        cursor: 'pointer',
      }}
    >
      <Box component="span" sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110', fontWeight: '600'}}>
          Name:
        </Typography>

        <Typography sx={{ fontSize: {xs: "12px", md: "18px"}, color: "#382110" }}>
          {discussion?.discussionName?.length > 14 ? `${discussion?.discussionName?.slice(0, 14)}...` : discussion?.discussionName}
        </Typography>
      </Box>

      <Box component="span" sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110', fontWeight: '600'}}>
          Group:
        </Typography>

        <Typography sx={{ fontSize: {xs: "12px", md: "18px"}, color: "#382110" }}>
          {discussion?.groupName?.length > 14 ? `${discussion?.groupName?.slice(0, 14)}...` : discussion?.groupName}
        </Typography>
      </Box>

      <Box component="span" 
        sx={{ width: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110', fontWeight: '600'}}>
          Participants:
        </Typography>

        <Typography sx={{ fontSize: {xs: "12px", md: "18px"}, color: '#382110'}}>
          {discussion?.participants?.length}
        </Typography>
        
      </Box>
      
    </Box>
  )
}

export default DiscussionItem;
