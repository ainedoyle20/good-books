import React from 'react';
import { Typography } from '@mui/material';

const BookStatus = ({ setShowShelves, inBookDetails }) => {
  let styles = {};
  if (inBookDetails) {
    styles = { borderRadius: "30px"};
  } else {
    styles = { borderTopLeftRadius: "3px", borderTopRightRadius: "3px"};
  }
  return (
    <Typography 
      width={inBookDetails ? "100%" : "auto"} height={inBookDetails ? "auto" : "35px"} 
      padding={inBookDetails ? "10px 20px" : "0 15px"} fontSize={inBookDetails ? "20px" : "16px"}
      borderBottom="none" color="#fff"
      display="flex" justifyContent="center" alignItems="center"
      sx={{ backgroundColor: "#3f8363", ":hover": { backgroundColor: "#409970" }, cursor: "pointer"}}
      style={styles}
      onClick={() => setShowShelves((prev) => !prev)}
    >
      Add to Shelf
    </Typography>
  );
}

export default BookStatus;

//    --color-background-wtr-base: #3f8363;
// --color-background-wtr-hover: #409970;