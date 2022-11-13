import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md"; 

import useGlobalStore from "../../store/globalStore";
import { addBookToShelf } from '../../utils';
import { getBookById } from '../../utils/rapidApi';

const ChooseShelf = ({ setShowShelves, inBookDetails, bookDetails }) => {
  const { getBookByIdResults, updateGetBookByIdResults, user } = useGlobalStore();
  const [loading, setLoading] = useState(false);

  const handleChosenShelf = async (shelf) => {
    if (loading) return;
    if (!user) {
      alert("Sorry you must be signed in to add a book to one of your bookshelves");
      return;
    }
    if (!bookDetails) return;

    setLoading(true);

    // Check global store: getBookByIdResults[bookDetails.book_id]
    // IS STORED: go ahead and add to sanity

    // NOT STORED: (1) getBookById (RAPIDAPI) (2) add result globalStorage (3) add result to sanity

    if (getBookByIdResults[bookDetails.book_id]) {
      console.log("IS STORED");
      await addBookToShelf(user._id, getBookByIdResults[bookDetails.book_id], shelf, user);
    } else {
      const bDetails = await getBookById(bookDetails.book_id);
      updateGetBookByIdResults(bookDetails.book_id, bDetails, getBookByIdResults);
      await addBookToShelf(user._id, bDetails, shelf);
    }

    setLoading(false);
    setShowShelves(false);
  } 

  return (
    <Stack 
      height={inBookDetails ? "300px" : "400px"} width="100%"
      marginTop={inBookDetails ? "0" : "35px"} position="absolute"
      gap={2}
      padding={inBookDetails ? "25px" : "10px"} zIndex="1000"
      sx={{ 
        backgroundColor: inBookDetails ? "#F4F1EA" : '#F4F1EA',
        display: inBookDetails ? "static" : "flex",
        justifyContent: "center"
      }}  
    >
      <Typography display="flex" alignItems="center" justifyContent="space-evenly" 
        fontSize={inBookDetails ? "25px" : "20px"} marginY="10px" sx={{ cursor: "default"}}
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
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, 
          cursor: loading ? "progress" : "pointer"
        }}
        onClick={() => handleChosenShelf(1)}
      >
        Want to Read
      </Typography>
      <Typography border="1px solid #382110" borderRadius="20px" color="#382110"
        display="flex" justifyContent="center" padding="5px 0" 
        fontSize={inBookDetails ? "20px" : "16px"}
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, 
          cursor: loading ? "progress" : "pointer"
        }}
        onClick={() => handleChosenShelf(2)}
      >
        Currently Reading
      </Typography>
      <Typography border="1px solid #382110" borderRadius="20px" color="#382110"
        display="flex" justifyContent="center" padding="5px 0" 
        fontSize={inBookDetails ? "20px" : "16px"}
        sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, 
          cursor: loading ? "progress" : "pointer"
        }}
        onClick={() => handleChosenShelf(3)}
      >
        Read
      </Typography>
    </Stack>
  );
}

export default ChooseShelf;
