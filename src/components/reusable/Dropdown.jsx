import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Typography, Divider } from '@mui/material';

import useGlobalStore from '../../store/globalStore';

const Dropdown = () => {
  const { updateNavSection } = useGlobalStore();
  const [dropDownTitles] = useState(["Profile", "Friends", "Groups", "Discussions", "Messages", "Reading Challange"]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (e) => {
    const sectionId = `${e.target.innerText.toLowerCase().replace(" ", "_")}_section`;
    if (pathname.includes("/profile")) {
      console.log('Already in profile page');
      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      updateNavSection(sectionId);
      navigate("/profile");
    }
  }

  return (
    <Stack
      position="absolute"
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
      {dropDownTitles.map((title, idx) => (
        <Typography key={`${title}${idx}`} onClick={(e) => handleClick(e)} padding="0 15px" width="100%" variant="h6" color="#382110" sx={{ ":hover": { textDecoration: "underline", cursor: "pointer"}}}>
          {title}
        </Typography>
      ))}

      <Divider component="li" style={{ listStyle: "none", borderColor: "#382110", marginLeft: "10px", marginRight: "10px"}} />

      <Typography padding="0 15px" width="100%" variant="h6" color="#382110" sx={{ ":hover": { textDecoration: "underline", cursor: "pointer" }}}>
        Logout
      </Typography>
    </Stack>
  )
}

export default Dropdown;
