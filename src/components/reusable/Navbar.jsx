import React, {useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';

import useGlobalStore from '../../store/globalStore';
import { SearchBar, Dropdown } from './';

const Navbar = () => {
  const { userDetails } = useGlobalStore();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {pathname} = useLocation();

  return (
    <>
      <Stack 
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        top={0}
        left={0}
        zIndex={50}
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

        {userDetails ? (
          <Stack
            direction="row"
            height="100%"
            sx={{ display: { xs: "none", md: "flex"} }}
          >
            {pathname !== "/" ? (
              <Link to="/">
                <Typography variant='h6' color="#382110" height="100%"  
                  sx={{ 
                    display: "flex",
                    ":hover": { backgroundColor: "#382110", color: "white" },
                    cursor: "pointer",
                    alignItems: "center",
                    padding: "0 15px",
                  }}
                  >
                  Home
                </Typography>
              </Link>
            ) : null}

            <Typography variant='h6' color="#382110" height="100%" 
              sx={{ 
                ":hover": { backgroundColor: "#382110", color: "white" },
                cursor: "pointer",
                alignItems: "center",
                padding: "0 15px",
                display: "flex",
              }}
            >
              MyBooks
            </Typography>
          </Stack>
        ) : null}

        <SearchBar showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />

        {userDetails ? (
          <Box  
            onClick={() => setShowDropdown((prev) => !prev)}
            padding="0 10px"
            sx={{ 
              ":hover": { backgroundColor: "#382110", color: "white" },
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: "100%"
            }}
          >
            <img 
              src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
              alt="notifications logo"
              height="38px"
              width="38px"
              style={{ borderRadius: "100%", border: "1px solid #9e795d"}}
            />
          </Box>
        ) : (
          <button>Login with Google</button>
        )}
        
      </Stack>

      {showDropdown ? (
        <Dropdown />
      ) : null}

      {userDetails ? (
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
          <Link to="/" style={{ height: "100%"}}>
            <Typography variant='h6' color="#382110" height="100%"
              sx={{ 
                ":hover": { backgroundColor: "#382110", color: "white" },
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "0 15px"
              }}
            >
              Home
            </Typography>
          </Link>  

          <Typography variant='h6' color="#382110" height="100%" 
            sx={{ 
              ":hover": { backgroundColor: "#382110", color: "white" },
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "0 15px"
            }}
          >
            MyBooks
          </Typography>

        </Stack>
      ): null}
      
    </>
    
  )
}

export default Navbar;
