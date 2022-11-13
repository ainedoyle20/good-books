import React from 'react';
import { Typography } from '@mui/material';

const AmazonButton = ({ setShowAmazonChoices }) => {
  return (
    <Typography 
      width="100%" height="auto"
      border="3px solid #3f8363" borderRadius="30px"
      display="flex" justifyContent="center" alignItems="center"
      sx={{ 
        cursor: "pointer", opacity: "0.85", 
        ":hover": { opacity: "1" },
        fontSize: { xs: "16px", md: "20px"},
        padding: {xs: "5px", md: "10px"},
        marginTop: { xs: "10px", md: "20px"}
      }}
      onClick={() => setShowAmazonChoices((prev) => !prev)}
    >
      Search on Amazon
    </Typography>
  );
}

export default AmazonButton;
