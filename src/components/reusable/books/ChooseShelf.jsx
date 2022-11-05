import React from 'react';
import { Stack, Typography } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md"; 

const ChooseShelf = ({ setShowShelves, title }) => {
  const handleChosenShelf = (shelf) => {
    console.log({ shelf, title });
  }

  return (
    <Stack 
      height="92%" width="100%" marginTop="13%" zIndex="1000"
      padding="10px" gap={2} position="absolute"
      sx={{ backgroundColor: 'white' }}
    >
      <Typography display="flex" alignItems="center" justifyContent="space-evenly" 
        fontSize="20px" marginY="10px" sx={{ cursor: "default"}}
      >
        Choose a Shelf
        <MdOutlineCancel style={{ fontSize: "25px", cursor: "pointer"}} onClick={() => setShowShelves(false)} />
      </Typography> 

      <Typography border="1px solid #382110" borderRadius="20px"
        display="flex" justifyContent="center" padding="5px 0" 
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, cursor: "pointer"}}
        onClick={(e) => handleChosenShelf(e.target.childNodes[0].data)}
      >
        Want to Read
      </Typography>
      <Typography border="1px solid #382110" borderRadius="20px"
        display="flex" justifyContent="center" padding="5px 0" 
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, cursor: "pointer"}}
        onClick={(e) => handleChosenShelf(e.target.childNodes[0].data)}
      >
        Currently Reading
      </Typography>
      <Typography border="1px solid #382110" borderRadius="20px"
        display="flex" justifyContent="center" padding="5px 0" 
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, cursor: "pointer"}}
        onClick={(e) => handleChosenShelf(e.target.childNodes[0].data)}
      >
        Read
      </Typography>
    </Stack>
  );
}

export default ChooseShelf;
