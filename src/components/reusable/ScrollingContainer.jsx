import React, { useRef } from 'react';
import { Stack, Box } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs';

const ScrollingContainer = ({ children, isLarge, inDiscussion }) => {
  const scrollRef = useRef();

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
        ref={scrollRef}
        sx={{
          borderRight: '1px solid #382110',
          borderLeft: '1px solid #382110',
          paddingTop: "15px",
          paddingBottom: inDiscussion ? "0" : "15px",
          width: isLarge ? "70%" : '50%',
          height: isLarge ? "600px" : '400px',
          position: inDiscussion ? "relative" : "static",
          overflowY: 'scroll',
          '&::-webkit-scrollbar':{
            width:0,
          }
        }}
      >
        {children}
      </Stack>  
      
      <Box component="span" fontSize={40} 
        sx={{ cursor: 'pointer', marginTop: inDiscussion ? 4 : 2}}
        onClick={() => scroll(390)}
      >
        <BsChevronBarDown />
      </Box>
    </>
  );
}

export default ScrollingContainer;
