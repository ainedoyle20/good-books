import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Divider } from '@mui/material';

import useGlobalStore from '../../../store/globalStore';
import { handleLogout } from '../../../utils';

const Dropdown = ({ setShowDropdown }) => {
  const { removeUser, user, removeUserDetails, updateNavSection } = useGlobalStore();
  const navigate = useNavigate();

  return (
    <Stack
      position="fixed"
      top="60px"
      right="5px"
      spacing={2}
      width="250px"
      height="auto"
      zIndex="1000"
      padding="15px 0"
      boxShadow="0 5px 10px rgb(0 0 0 / 15%)"
      sx={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <Typography padding="0 15px" width="100%" variant="h6" color="#382110"
        sx={{ ":hover": { textDecoration: "underline", cursor: "pointer"}}}
        onClick={(e) => {
          e.stopPropagation();
          updateNavSection("profile_section");
          navigate(`/profile/${user?._id}`);
          setShowDropdown(false);
        }}   
      >
        Profile
      </Typography>

      <Divider component="li" style={{ listStyle: "none", borderColor: "#382110", marginLeft: "10px", marginRight: "10px"}} />

      <Typography padding="0 15px" width="100%" variant="h6" color="#382110" sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" }}}
        onClick={() => {
          handleLogout(removeUser, removeUserDetails);
          setShowDropdown(false);
        }}
      >
        Logout
      </Typography>
    </Stack>
  )
}

export default Dropdown;
