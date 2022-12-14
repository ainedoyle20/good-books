import React, { useRef, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs';

const ScrollingContainer = ({ children, isLarge, inDiscussion, messageObject, discussion }) => {
  const scrollRef = useRef(); 

  useEffect(() => {
    if ((messageObject === null || messageObject === undefined) && !discussion) return;
    // scrolls to most recent message
    const scrollToBottom = () => {
      // console.log("scrolling: ", messageObject, inDiscussion);
      const el = document.getElementById("scrolling_container");
      el.scrollTop = el.scrollHeight;
    }

    scrollToBottom();
  }, [messageObject, discussion]); 

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollTop += scrollOffset;
  }

  return (
    <>
      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginBottom: 2}}
        onClick={() => scroll(-390)}
      >
        <BsChevronBarUp />
      </Box>

      <Stack
        sx={{
          borderRight: '1px solid #382110',
          borderLeft: '1px solid #382110',
          paddingTop: "15px",
          paddingBottom: inDiscussion ? "80px" : "15px",
          width: isLarge ? {xs: "95%", sm: "60%", md: "900px"} : {xs: "95%", sm: "60%", md: "50%"},
          maxWidth: isLarge ? "900px" : "600px",
          height: isLarge ? {xs: "300px", sm: "400px", md: "500px"} : {xs: "300px", md: "400px"},
          position: inDiscussion ? "relative" : "static",
        }}
      >
        <Stack id="scrolling_container" ref={scrollRef} height="100%" width="100%"
          sx={{ overflowY: "scroll", "&::-webkit-scrollbar": { width: 0 } }}
        >
          {children}
        </Stack>
      </Stack>  
      
      <Box component="span" fontSize={40} 
        sx={{ cursor: 'pointer', marginTop: 3}}
        onClick={() => scroll(390)}
      >
        <BsChevronBarDown />
      </Box>
    </>
  );
}

export default ScrollingContainer;
