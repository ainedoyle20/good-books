import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';

import { BookStatus, AmazonButton, ChooseShelf, Stars, AmazonSites } from "./";
import { formatLargeImgUrl } from "../../utils";
import { Loader } from "../reusable";

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
    <Box display="flex" marginBottom="50px"
      sx={{ flexDirection: {xs: "column", md: "row" }, width: {xs: "100%", md: "80%"}, maxWidth: "1500px"}}
    >
      <Stack display="flex" alignItems="center"
        sx={{ width: { xs: "100%", md: "auto"}, marginRight: { xs: "0", md: "40px"}, marginBottom: {xs: "50px", md: "0"}}}
      >
        <Box height="400px" width="300px" display="flex" justifyContent="center" alignItems="center"
          sx={{ marginBottom: {xs: "20px", md: "40px"}}}
        >
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
        <Box position="relative" width="100%" maxWidth="350px">
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

      <Stack sx={{ paddingX: {xs: "5px", sm: "15px", md: "0"}}}>
        <Typography 
          sx={{ cursor: inSearchResults ? "pointer" : "text", fontSize: {xs: "20px", md: inSearchResults? "30px" : "40px"} }} 
          onClick={handleClickedBook}
        >
          {bookDetails?.name}
        </Typography>

        <Typography marginBottom="10px"
         sx={{ fontSize: {xs: "18px", md: "30px"} }}
        >
          {bookDetails?.authors[0]}
        </Typography>

        <Box marginBottom="30px" display="flex">
          <Typography sx={{ fontSize: {xs: "18px", md: "30px"} }} >
            Rating: {bookDetails?.rating}
          </Typography>
          <Stars stars={bookDetails?.rating ? bookDetails?.rating : 1} />
        </Box>
        
        {!inSearchResults ? (
          <>
            <Stack width="100%" height={showAllSynopsis ? "auto" : "250px"}
              borderBottom="1px solid rgba(1, 1, 1, 0.1)" sx={{ overflow: "hidden"}}>
              {bookDetails?.synopsis.split(".").map((sentence, idx) => (
                <Typography key={`${sentence}-${idx}`} marginBottom="10px" sx={{ fontSize: {xs: "14px", md: "18px"}}}>
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

        <Typography marginTop={inSearchResults ? "0" : "20px"} sx={{ fontSize: {xs: "15px", md: "22px"} }}>
          {!inSearchResults ? bookDetails?.pages + " pages" : "created editions: " + bookDetails?.created_editions}
        </Typography>
        <Typography marginTop="10px" sx={{ fontSize: {xs: "15px", md: "22px"} }}>
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
