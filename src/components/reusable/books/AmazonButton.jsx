import React from 'react';
import { Typography } from '@mui/material';

const AmazonButton = ({ setShowAmazonChoices }) => {
  return (
    <Typography 
      width="100%" height="auto"
      padding="10px" marginTop="20px" fontSize="20px"
      border="3px solid #3f8363" borderRadius="30px"
      display="flex" justifyContent="center" alignItems="center"
      sx={{ cursor: "pointer", opacity: "0.85", ":hover": { opacity: "1" }}}
      onClick={() => setShowAmazonChoices((prev) => !prev)}
    >
      Search on Amazon
    </Typography>
  );
}

export default AmazonButton;
