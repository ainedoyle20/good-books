import React, { useState } from 'react';
import { Typography } from '@mui/material';

import { AuthDropdown } from './';

const LoginButton = () => {
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  return (
    <>
      <Typography 
        padding="0 20px" marginRight="10px" boxShadow="1px 1px 1px 1px #d4d0c9"
        sx={{ 
          cursor: "pointer", 
          ":hover": { padding: "0 19px" },
          fontSize: {xs: "16px", md: "22px"},
          padding: {xs: "0 10px", md: "0 20px"}
        }}
        onClick={() => setShowAuthDropdown((prev) => !prev)}
      >
        Login
      </Typography>

      {showAuthDropdown ? (
        <AuthDropdown />
      ) : null}
    </>
  )
}

export default LoginButton;
