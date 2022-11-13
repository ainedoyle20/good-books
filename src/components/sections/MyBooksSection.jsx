import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography, Divider } from '@mui/material';
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteForever } from "react-icons/md";

import useGlobalStore from '../../store/globalStore';
import { removeBookFromShelf, fetchUserDetails } from '../../utils';
import { Stars } from "../books";
import Loader from "../reusable/Loader";

const MyBooksSection = () => {
  const { userDetails, user, addUserDetails } = useGlobalStore();
  const [activeShelf, setActive] = useState(1);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!userDetails) return;

    if (activeShelf === 1) {
      userDetails.wantToRead ? setMyBooks(userDetails.wantToRead) : setMyBooks([]);
    } else if (activeShelf === 2) {
      userDetails.currentlyReading ? setMyBooks(userDetails.currentlyReading) : setMyBooks([]);
    } else {
      userDetails.read ? setMyBooks(userDetails.read) : setMyBooks([]);
    }
    
    setLoading(false);
  }, [userDetails, activeShelf])

  const handleRemoveBook = async (bookKey) => {
    setShowDelete(null);
    setLoading(true);
    await removeBookFromShelf(user._id, activeShelf, bookKey);
    await fetchUserDetails(user._id, addUserDetails);
  }
  

  return (
    <Stack 
      id="bookshelves_section"
      width="100vw" height="auto" display="flex"
      paddingY="150px"
      sx={{ paddingX: { xs: "40px", lg: "80px"}}}
    >
      <Box width="100%" borderBottom="2px solid #382110" paddingBottom="10px" marginBottom="50px">
        <Typography fontSize="30px">
          My Books
        </Typography>
      </Box>

      <Box display="flex" width="100%" sx={{ flexDirection: { xs: "column", lg: "row"}}}>
        <Stack marginRight="50px" padding="0 10px" display="flex"
          sx={{ cursor: "default", 
            width: { xs: "100%", lg: "300px"}, 
            justifyContent: { xs: "center", lg: "normal"},
            flexDirection: { xs: "row", lg: "column"},
            marginBottom: { xs: "20px", lg: "0"},
            gap: { xs: 5, lg: 0} 
          }}
        >
          <Typography variant="h5" marginBottom="10px" sx={{ display: { xs: "none", lg: "block"}}}>
            Bookshelves
          </Typography>
          
          <Typography fontSize="18px" marginBottom="5px" sx={{ display: { xs: "none", lg: "block"}}}>
            All &#10088; {
              (userDetails?.wantToRead?.length || 0)
              + (userDetails?.currentlyReading?.length || 0)
              + (userDetails?.read?.length || 0)
            } &#10089;
          </Typography>
          <Typography fontWeight={activeShelf === 1 ? "bold" : "400"} marginBottom="5px" sx={{ cursor: "pointer", fontSize: { xs: "16px", lg: "18px"} }}
            onClick={() => setActive(1)}
          >
            Want to Read &#10088; {userDetails?.wantToRead?.length || 0} &#10089;
          </Typography>
          <Typography fontWeight={activeShelf === 2 ? "bold" : "400"} marginBottom="5px" sx={{ cursor: "pointer", fontSize: { xs: "16px", lg: "18px"} }}
            onClick={() => setActive(2)}
          >
            Currently Reading &#10088; {userDetails?.currentlyReading?.length || 0} &#10089;
          </Typography>
          <Typography fontWeight={activeShelf === 3 ? "bold" : "400"} marginBottom="5px" sx={{ cursor: "pointer", fontSize: { xs: "16px", lg: "18px"} }}
            onClick={() => setActive(3)}
          >
            Read &#10088; {userDetails?.read?.length || 0} &#10089;
          </Typography>
        </Stack>

        <Stack display="flex" alignItems="center" width="100%">
          <Stack direction="row" marginBottom="30px" borderBottom='3px solid #382110'
            width="100%"
          >
            <Typography width="22%" display="flex" justifyContent="center">
              cover
            </Typography>
            <Typography width="22%" display="flex" justifyContent="center">
              tite
            </Typography>
            <Typography width="22%" display="flex" justifyContent="center">
              author
            </Typography>
            <Typography width="22%" display="flex" justifyContent="center">
              rating
            </Typography>
            <Typography width="22%" display="flex" justifyContent="center">
              date read
            </Typography>
          </Stack>

          
          <Stack  width="100%" height="700px" borderBottom="1px solid rgba(1, 1, 1, 0.1)"
            sx={{ overflowY: "scroll", "&::-webkit-scrollbar": { width: 0 } }}
          >
            {!loading && myBooks.length ? (
              myBooks.map(({ _key, bookId, bookCover, bookTitle, bookAuthors, bookRating, dateAdded }, idx) => (
                <Stack key={_key}
                  direction="row" position="relative" height="160px" width="100%"  
                  marginBottom="30px" sx={{ cursor: "default"}}
                >
                  <Box height="100%" width="22%" padding="0 15px" paddingBottom="10px" display="flex" justifyContent="center" alignItems="center">
                    <img alt="book cover" src={bookCover} width="100%" height="auto" 
                      style={{ maxHeight: "140px", maxWidth: "100px", cursor: "pointer" }} 
                      onClick={() => navigate(`/bookdetails/${bookId}`)}
                    />
                  </Box>
                  <Box height="100%" width="22%" paddingTop="10px" paddingX="5px" display="flex" justifyContent="center">
                    <Typography fontSize="14px">
                      {bookTitle}
                    </Typography>
                  </Box>
                  <Box height="100%" width="22%" paddingTop="10px" display="flex" justifyContent="center">
                    <Typography fontSize="14px">
                      {bookAuthors[0]}
                    </Typography>
                  </Box>
                  <Box height="100%" width="22%" paddingTop="10px" display="flex" justifyContent="center">
                    <Stars stars={bookRating} inMyBooks={true} />
                  </Box>
                  <Box height="100%" width="22%" paddingTop="10px" display="flex" justifyContent="center">
                    <Typography fontSize="14px">
                      {dateAdded}
                    </Typography>
                  </Box>
                  <Box position="absolute" right="0" display="flex" justifyContent="center" alignItems="center"
                    height="100%"
                    sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", backgroundColor: "#F4F1EA"}}
                    width={showDelete === bookId ? "100px" : "auto"}
                  >
                    <Typography fontSize="25px" display="flex" alignItems="center" justifyContent="flex-start"
                      width="100%"
                    >
                      {showDelete === bookId ? (
                        <MdArrowForwardIos onClick={() => setShowDelete(null)} style={{ cursor: "pointer"}} />
                      ) : (
                        <MdArrowBackIos onClick={() => setShowDelete(bookId)} style={{ marginLeft: "8px", cursor: "pointer"}} />
                      )}

                      {
                        showDelete === bookId ? (
                          <MdDeleteForever 
                            onClick={() => handleRemoveBook(_key)}
                            style={{ marginLeft: "10px", fontSize: "40px", cursor: "pointer"}} 
                          />
                        ) : null
                      }
                      
                    </Typography>
                  </Box>

                  <Divider component="li"
                    style={{ position: "absolute", top: "105%", width: "50%", left: "25%",
                      listStyle: "none", borderColor: "#382110", 
                      marginBottom: "30px", opacity: "0.5"
                    }} 
                  />
                </Stack>
              ))
            ) : null}

            {!loading && !myBooks.length ? (
              <Typography>You have no books in this shelf</Typography>
            ) : null}

            {loading ? (
              <Loader inScrollingContainer={true} />
            ) : null}
            
          </Stack>
          
        </Stack>
        
      </Box>
    </Stack>
  );
}

export default MyBooksSection;
// box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;