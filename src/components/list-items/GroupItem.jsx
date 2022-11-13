import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GroupItem = ({ group, user, showMyGroups }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/group/${group._id}`)}
      sx={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingY: "10px",
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': { paddingY: "9.5px" },
        cursor: 'pointer',
      }}
    >
      <Box component="span" sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        
      >
        <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110', fontWeight: '600'}}>
          Name:
        </Typography>
        <Typography sx={{ fontSize: {xs: "12px", md: "20px"}}} color="#382110">
          {group?.groupName?.length > 14 ? `${group?.groupName?.slice(0, 14)}...` : group?.groupName}
        </Typography>
      </Box>

      <Box component="span" 
        sx={{ width: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110', fontWeight: '600'}}>
          Members:
        </Typography>

        <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110'}}>
          {group?.members?.length}
        </Typography>
        
      </Box>

      <Box component="span" 
        sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'scroll' }}
      >
        <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110', fontWeight: '600'}}>
          Creator:
        </Typography>

        <Typography sx={{ fontSize: {xs: "12px", md: "20px"}, color: '#382110'}}>
          {group?.postedBy?.userName?.length > 10 ? `${group?.postedBy?.userName?.slice(0, 10)}...` : group?.postedBy?.userName}
        </Typography>
      </Box>

      {!showMyGroups ? (
        <Box component="span" 
          sx={{ width: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography sx={{ fontSize: {xs: "14px", md: "20px"}, color: '#382110', fontWeight: '600'}}>
            Joined:
          </Typography>

          <Typography sx={{ fontSize: {xs: "12px", md: "20px"}, color: '#382110'}}>
            {group.members.map(member => member._id).includes(user._id) ? "true" : "false"}
          </Typography>
          
        </Box>
      ): null
      }
      
    </Box>
  );
}

export default GroupItem;
