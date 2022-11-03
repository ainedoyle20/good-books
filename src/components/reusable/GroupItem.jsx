import React from 'react';
import { Box, Typography } from '@mui/material';
import { BsCheck2 } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom';

const GroupItem = ({ group, selectedGroups, setSelectedGroups, user, showMyGroups }) => {
  const {id} = useParams();
  const navigate = useNavigate();
  return (
    <Box
      key={group?._id}
      onClick={() => navigate(`/group/${group._id}`)}
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
      <Box component="span" sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        
      >
        <Typography sx={{ fontSize: 20, color: '#382110', fontWeight: '600'}}>
          Name:
        </Typography>
        <Typography fontSize={20} color="#382110">
          {group?.groupName}
        </Typography>
      </Box>

      <Box component="span" 
        sx={{ width: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography sx={{ fontSize: 20, color: '#382110', fontWeight: '600'}}>
          Members:
        </Typography>

        <Typography sx={{ fontSize: 20, color: '#382110'}}>
          {group?.members?.length}
        </Typography>
        
      </Box>

      <Box component="span" 
        sx={{ width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'scroll' }}
      >
        <Typography sx={{ fontSize: 20, color: '#382110', fontWeight: '600'}}>
          Creator:
        </Typography>

        <Typography sx={{ fontSize: 20, color: '#382110'}}>
          {group?.postedBy?.userName}
        </Typography>
      </Box>

      {!showMyGroups ? (
        <Box component="span" 
          sx={{ width: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography sx={{ fontSize: 20, color: '#382110', fontWeight: '600'}}>
            Joined:
          </Typography>

          <Typography sx={{ fontSize: 20, color: '#382110'}}>
            {group.members.map(member => member._id).includes(user._id) ? "true" : "false"}
          </Typography>
          
        </Box>
      ): null
      }
      
    </Box>
  );
}

export default GroupItem;
