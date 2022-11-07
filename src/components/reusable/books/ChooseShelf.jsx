import React from 'react';
import { Stack, Typography } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md"; 

const ChooseShelf = ({ setShowShelves, inBookDetails, bookDetails }) => {
  const handleChosenShelf = (shelf) => {
    if (!bookDetails) return;
    console.log({ shelf, id: bookDetails?.book_id });

    // Check global store: getBookByIdResults[bookDetails.book_id]
    // IS STORED: go ahead and add to sanity

    // NOT STORED: (1) getBookById (RAPIDAPI) (2) add result globalStorage (3) add result to sanity
  } 

  return (
    <Stack 
      height={inBookDetails ? "300px" : "400px"} width="100%"
      marginTop={inBookDetails ? "0" : "35px"} position="absolute"
      padding={inBookDetails ? "25px" : "10px"} zIndex="1000"
      sx={{ backgroundColor: inBookDetails ? "#F4F1EA" : 'white' }}  gap={2}
    >
      <Typography display="flex" alignItems="center" justifyContent="space-evenly" 
        fontSize={inBookDetails ? "30px" : "20px"} marginY="10px" sx={{ cursor: "default"}}
        color="#382110"
      >
        Choose a Shelf
        <MdOutlineCancel 
          style={{ fontSize: inBookDetails ? "32px" : "25px", cursor: "pointer", color: "#382110"}} 
          onClick={() => setShowShelves(false)} 
        />
      </Typography> 

      <Typography border="1px solid #382110" borderRadius="20px" color="#382110"
        display="flex" justifyContent="center" padding="5px 0" 
        fontSize={inBookDetails ? "20px" : "16px"}
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, cursor: "pointer"}}
        onClick={(e) => handleChosenShelf(e.target.childNodes[0].data)}
      >
        Want to Read
      </Typography>
      <Typography border="1px solid #382110" borderRadius="20px" color="#382110"
        display="flex" justifyContent="center" padding="5px 0" 
        fontSize={inBookDetails ? "20px" : "16px"}
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, cursor: "pointer"}}
        onClick={(e) => handleChosenShelf(e.target.childNodes[0].data)}
      >
        Currently Reading
      </Typography>
      <Typography border="1px solid #382110" borderRadius="20px" color="#382110"
        display="flex" justifyContent="center" padding="5px 0" 
        fontSize={inBookDetails ? "20px" : "16px"}
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, cursor: "pointer"}}
        onClick={(e) => handleChosenShelf(e.target.childNodes[0].data)}
      >
        Read
      </Typography>
    </Stack>
  );
}

export default ChooseShelf;
