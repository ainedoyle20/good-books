import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import useGlobalStore from '../../../store/globalStore';

const SmallNavbar = () => {
  const { user, updateNavSection } = useGlobalStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Stack 
      direction="row"
      position="fixed"
      top="60px"
      left={0}
      zIndex={20}
      width="100%"
      height="60px"
      sx={{
        backgroundColor: "#F4F1EA",
        padding: "0 30px",
        borderTop: "1px solid black",
        display: {xs: "flex", md: "none"}
      }}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Typography 
        variant='h6' color="#382110" height="100%"
        display="flex" alignItems="center" padding="0 15px"
        sx={{ ":hover": { backgroundColor: "#382110", color: "white" }, cursor: "pointer" }}
        onClick={() => { navigate("/"); updateNavSection("profile_section"); }}
      >
        Home
      </Typography>

      <Typography variant='h6' color="#382110" height="100%" 
        sx={{ 
          ":hover": { backgroundColor: "#382110", color: "white" },
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "0 15px"
        }}
        onClick={() => {
          updateNavSection("bookshelves_section");
          if (pathname === "/") {
            navigate(`/profile/${user?._id}`);
          } 
        }}
      >
        MyBooks
      </Typography>

    </Stack>
  );
}

export default SmallNavbar;
