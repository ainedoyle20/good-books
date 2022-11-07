import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md";

const AmazonSites = ({ setShowAmazonChoices, bookName }) => {
  const [ amazonWebsites ] = useState([
    "amazon.com",
    "amazon.co.uk",
    "amazon.com.au",
    "amazon.de",
    "amazon.fr",
    "amazon.it",
    "amazon.es",
  ]);

  const handleChosenAmazonWebsite = (amazonWebsite) => {
    if (!bookName) return;
    // console.log("website: ", amazonWebsite);
    const modifiedName = bookName.replaceAll(" ", "+");
    const amazonUrl = `https://www.${amazonWebsite}/s?k=${modifiedName}`;
    window.open(amazonUrl, "_blank");
    setShowAmazonChoices(false);
  }

  return (
    <Stack 
      maxHeight="300px" width="100%"
      marginTop="0" position="absolute"
      padding="25px" zIndex="1000" gap={2}
      sx={{ backgroundColor: "#F4F1EA", overflowY: "scroll", "&::-webkit-scrollbar": {width: 0 } }}  
    >
      <Typography display="flex" alignItems="center" justifyContent="space-evenly" 
        fontSize="30px" marginY="10px" sx={{ cursor: "default"}} color="#382110"
      >
        Amazon Websites
        <MdOutlineCancel 
          style={{ fontSize: "32px", cursor: "pointer", color: "#382110"}} 
          onClick={() => setShowAmazonChoices(false)} 
        />
      </Typography> 

      {amazonWebsites.map((website) => (
        <Typography key={website}
          border="1px solid #382110" borderRadius="20px" color="#382110"
          display="flex" justifyContent="center" padding="5px 0" 
          fontSize="20px"
          sx={{ ":hover": { marginLeft: "1px", marginRight: "1.5px" }, cursor: "pointer"}}
          onClick={(e) => handleChosenAmazonWebsite(e.target.childNodes[0].data)}
        >
          {website}
        </Typography>
      ))}

    </Stack>
  );
}

export default AmazonSites;
