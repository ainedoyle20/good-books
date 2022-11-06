import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';

import useGlobalStore from '../../../store/globalStore';
import LoginButton from "../LoginButton";
import Searchbar from "./Searchbar";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  const { user } = useGlobalStore();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <Stack 
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      position="fixed"
      top={0}
      left={0}
      zIndex={2000}
      width="100%"
      height="60px"
      sx={{
        backgroundColor: "#F4F1EA",
        paddingLeft: { xs: "10px", md: "30px"},
        paddingRight: { xs: "0", md: "10px"}
      }}
    >
      <Box 
        height="100%" 
        sx={{ 
          display: { xs: "flex", md: "none"},
          alignItems: "center",
          cursor: 'pointer'
        }}
        onClick={() => setShowSearchBar((prev) => !prev)}
      >
        <img
          src="https://s.gr-assets.com/assets/layout/header/icn_nav_search_black.svg"
          alt="search"
          height="25px"
          width="25px"
          style={{ color: "#382110"}}
        />
      </Box>


      <Link to="/">
        <Typography sx={{ fontSize: { xs: 30, md: 40 } }} color="#382110">
          <span style={{ fontWeight: "100"}}>good</span><span>books</span>
        </Typography>
      </Link> 

      {/* {user ? (
        <Stack
          direction="row"
          height="100%"
          sx={{ display: { xs: "none", md: "flex"} }}
        >
          {pathname !== "/" ? (
            <Typography 
              variant='h6' color="#382110" height="100%" padding="0 15px" 
              display="flex" alignItems="center"
              sx={{ ":hover": { backgroundColor: "#382110", color: "white" }, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Home
            </Typography>
          ) : null}

          <Typography 
            variant='h6' color="#382110" height="100%" padding="0 15px" 
            display="flex" alignItems="center"
            sx={{ ":hover": { backgroundColor: "#382110", color: "white" }, cursor: "pointer" }}
            onClick={() => {
              updateNavSection("bookshelves_section");
              if (pathname !== `/profile/${user?._id}`) navigate(`/profile/${user?._id}`);
            }}
          >
            MyBooks
          </Typography>
        </Stack>
      ) : null} */}

      <Searchbar showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />

      {user ? (
        <ProfileButton user={user} />
      ) : (
        <LoginButton />
      )}
      
    </Stack>
  );
}

export default Navbar;
