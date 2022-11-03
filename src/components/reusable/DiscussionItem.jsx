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
        padding: "10px 0 10px 0",
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': {borderTop: '3px solid #382110', borderBottom: '3px solid #382110'},
        cursor: 'pointer',
      }}
    >
      <Box component="span" sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 20, color: '#382110', fontWeight: '600'}}>
          Name:
        </Typography>

        <Typography fontSize={20} color="#382110">
          {discussion?.discussionName}
        </Typography>
      </Box>

      <Box component="span" sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 20, color: '#382110', fontWeight: '600'}}>
          Group:
        </Typography>

        <Typography fontSize={20} color="#382110">
          {discussion?.groupName}
        </Typography>
      </Box>

      <Box component="span" 
        sx={{ width: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography sx={{ fontSize: 20, color: '#382110', fontWeight: '600'}}>
          Participants:
        </Typography>

        <Typography sx={{ fontSize: 20, color: '#382110'}}>
          {discussion?.participants?.length}
        </Typography>
        
      </Box>
      
    </Box>
  )
}

export default DiscussionItem;
