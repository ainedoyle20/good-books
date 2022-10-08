import React, {useState} from 'react';
import { Box, Stack } from '@mui/material';

const SearchBar = ({ showSearchBar, setShowSearchBar }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  }

  const handleSearch = () => {
    const searchValue = searchTerm.toLowerCase();
    setSearchTerm("");
    setShowSearchBar(false);
  }

  return (
    <>
    <Stack direction="row" alignItems="center" width="50%" height="40px" 
      sx={{ 
        backgroundColor: "white",
        display: { xs: "none", md: "flex"}
      }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          border: "none",
          height: "100%",
          width: "100%",
          outline: "none",
          fontSize: "18px",
          padding: "2px 10px",
        }}
        placeholder="Search books by title"
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <Box 
        height="100%" 
        paddingRight="5px"
        sx={{ display: "flex", alignItems: "center", cursor: "pointer"}}
        onClick={handleSearch}
      >
        <img
          src="https://s.gr-assets.com/assets/layout/header/icn_nav_search.svg"
          alt="search"
          height="25px"
          width="25px"
        />
      </Box>
    </Stack>

    {showSearchBar ? (
      <Stack
        direction="row"
        alignItems="center"
        height="60px"
        width="100vw"
        zIndex={50}
        sx={{
          display: {xs: "flex", md: "none"},
          position: "absolute",
          top: "60px",
          left: 0,
          padding: "0px 10px"
        }}
      >
        <Box position="relative" width="100%" height="40px">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              outline: "none",
              fontSize: "20px",
              padding: "5px 10px",
              width: "100%",
              height: "100%",
              border: "none"
            }}
            placeholder="Search books by title"
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </Box>
        

        <Box 
          height="100%" 
          paddingRight="5px"
          position="absolute"
          right="10px"
          sx={{ display: "flex", alignItems: "center", cursor: "pointer"}}
          onClick={(e) => {
            e.stopPropagation();
            handleSearch();
          }}
        >
          <img
            src="https://s.gr-assets.com/assets/layout/header/icn_nav_search.svg"
            alt="search"
            height="25px"
            width="25px"
          />
        </Box>
      </Stack>
    ) : null}
    </>
  );
}

export default SearchBar;
