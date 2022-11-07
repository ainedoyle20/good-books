import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';

import { BookStatus, AmazonButton, ChooseShelf, Stars, AmazonSites } from "./";
import { formatLargeImgUrl } from "../../../utils";
import Loader from "../Loader";

const BookDetails = ({ bookDetails, inSearchResults }) => {
  const [showShelves, setShowShelves] = useState(false);
  const [showAmazonChoices, setShowAmazonChoices] = useState(false);
  const [showAllSynopsis, setShowAllSynopsis] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoadingImage(true);

    const largeImageUrl = formatLargeImgUrl(bookDetails?.cover);
    if (largeImageUrl) setLargeImgUrl(largeImageUrl);

    setLoadingImage(false);

    // eslint-disable-next-line
  }, []);

  const handleClickedBook = () => {
    if (!inSearchResults) return;
    if (inSearchResults) {
      navigate(`/bookdetails/${bookDetails?.book_id}`);
    }
  }

  return (
    <Box display="flex" width="80%" marginBottom="50px">
      <Stack  display="flex" alignItems="center" marginRight="40px">
        <Box height="400px" width="300px" marginBottom="40px" display="flex" justifyContent="center" alignItems="center">
          {loadingImage ? (
              <Loader inScrollingContainer={true} />
          ) : (
            <img alt="book cover" 
              src={largeImgUrl ? largeImgUrl : bookDetails?.cover} 
              height="400px" 
              width="300px" 
              style={{ cursor: inSearchResults ? "pointer" : "default" }}
              onError={({currentTarget}) => {
                currentTarget.onerror=null;
                currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
              }}
              onClick={handleClickedBook}
            />
          )}
        </Box>
        <Box position="relative" width="400px">
          <BookStatus setShowShelves={setShowShelves} inBookDetails={true} />

          {showShelves ? (
            <ChooseShelf setShowShelves={setShowShelves} inBookDetails={true} bookDetails={bookDetails} />
          ) : null}

          <AmazonButton setShowAmazonChoices={setShowAmazonChoices} />

          {showAmazonChoices ? (
            <AmazonSites setShowAmazonChoices={setShowAmazonChoices} bookName={bookDetails?.name} />
          ) : null}
        </Box>

      </Stack>

      <Stack>
        <Typography fontSize="40px" sx={{ cursor: inSearchResults ? "pointer" : "text" }} onClick={handleClickedBook}>
          {bookDetails?.name}
        </Typography>

        <Typography variant='h5' marginBottom="10px">
          {bookDetails?.authors[0]}
        </Typography>

        <Box marginBottom="30px" display="flex">
          <Typography variant='h5' >
            Rating: {bookDetails?.rating}
          </Typography>
          <Stars stars={bookDetails?.rating ? bookDetails?.rating : 1} />
        </Box>
        
        {!inSearchResults ? (
          <>
            <Stack width="100%" height={showAllSynopsis ? "auto" : "250px"}
              borderBottom="1px solid rgba(1, 1, 1, 0.1)" sx={{ overflow: "hidden"}}>
              {bookDetails?.synopsis.split(".").map((sentence, idx) => (
                <Typography key={`${sentence}-${idx}`} marginBottom="10px" fontSize="18px">
                  {sentence}
                </Typography>
              ))}
            </Stack>
            <Typography width="100%" 
              paddingTop="10px" paddingLeft="5px"
              sx={{cursor: "pointer"}} 
              onClick={() => showAllSynopsis ? setShowAllSynopsis(false) : setShowAllSynopsis(true)}
            >
              {showAllSynopsis ? "Show less" : "Show more"}
            </Typography>
          </>
        ) : null}

        <Typography marginTop="20px" fontSize="22px">
          {!inSearchResults ? bookDetails?.pages + " pages" : "created editions: " + bookDetails?.created_editions}
        </Typography>
        <Typography marginTop="10px" fontSize="22px">
          {!inSearchResults 
            ? "Date published: " + bookDetails?.published_date 
            : "Year published: " + bookDetails?.year
          }
        </Typography>
      </Stack>
    </Box>
  );
}

export default BookDetails;
