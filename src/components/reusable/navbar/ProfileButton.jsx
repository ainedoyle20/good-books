import React, { useState } from 'react';
import { Box } from '@mui/material';

import Dropdown from './Dropdown';

const ProfileButton = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Box  
      onClick={() => setShowDropdown((prev) => !prev)}
      position="relative"
      padding="0 10px" display="flex" alignItems="center" height="100%"
      sx={{ ":hover": { backgroundColor: "#382110", color: "white" }, cursor: "pointer" }}
    >
      <img 
        src={user?.image 
          ? user?.image 
          : "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
        }
        alt="profile"
        height="38px"
        width="38px"
        style={{ 
          borderRadius: "100%", 
          border: (user?.image || user?.image === "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png") 
          ? "none" : "1px solid #9e795d" 
        }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // to prevent looping
          currentTarget.src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
        }}
      />    

      {showDropdown ? (
        <Dropdown setShowDropdown={ setShowDropdown } />
      ) : null}        
    </Box>
  );
}

export default ProfileButton;
