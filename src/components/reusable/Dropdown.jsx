import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Typography, Divider } from '@mui/material';
import { googleLogout } from '@react-oauth/google';

import useGlobalStore from '../../store/globalStore';

const Dropdown = ({ setShowDropdown }) => {
  console.log("open");
  const { updateNavSection, removeUser, user } = useGlobalStore();
  const [dropDownTitles] = useState(["Profile", "Friends", "Groups", "Discussions", "Messages", "Reading Challange"]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (e) => {
    navigate(`/profile/${user._id}`);
    window.location.reload();
  }

  const handleLogout = () => {
    googleLogout();
    removeUser();
    setShowDropdown(false);
  }

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
      <Typography onClick={(e) => handleClick(e)} padding="0 15px" width="100%" variant="h6" color="#382110" sx={{ ":hover": { textDecoration: "underline", cursor: "pointer"}}}>
        Profile
      </Typography>

      <Divider component="li" style={{ listStyle: "none", borderColor: "#382110", marginLeft: "10px", marginRight: "10px"}} />

      <Typography padding="0 15px" width="100%" variant="h6" color="#382110" sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" }}}
        onClick={handleLogout}
      >
        Logout
      </Typography>
    </Stack>
  )
}

export default Dropdown;
