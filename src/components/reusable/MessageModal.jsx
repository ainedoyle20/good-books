import React, {useState, useRef} from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs'

const MessageModal = ({ messageObj, setShowMessageModal, user }) => {
  console.log("messageObj: ", messageObj, "user: ", user);
  const [searchTerm, setSearchTerm] = useState("");

  const ref = useRef();

  const formatDate = (dateStr) => {
    const dateArray = dateStr.split(" ").slice(0, 3);

    const swap = (arr, idx1, idx2) => {
        return [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }

    swap(dateArray, 1, 2);

    dateArray[0] = dateArray[0] + ",";

    const formatedDate = dateArray.join(" ");

    return formatedDate;
  }

  // setShowMessageModal(false);

  const isYesterday = (stringDate) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday.toDateString() === new Date(stringDate).toDateString()) {
      return true;
    } else {
      return false;
    }
  }

  const scroll = (scrollOffset) => {
    ref.current.scrollTop += scrollOffset;
  };

  return (
    <Stack
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack width="50%" 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '30px'
        }}
      >
        <img
          alt="profile pic"
          src={messageObj?.messageFriend?.image}
          onError={(e) => {
            e.target.src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
            e.onerror=null
          }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "100%",
            marginBottom: "10px"
          }}
        />

        <Typography
          sx={{
            fontSize: 25,
            marginBottom: '30px',
            color: '#382110',
            fontWeight: '300',
            cursor: 'pointer',
          }}
        >
          {messageObj?.messageFriend?.userName}
        </Typography>

        <Stack direction="row" width="100%" sx={{ display: 'flex', alignItems: 'center'}}>
          <Box sx={{ position: 'relative', backgroundColor: 'white', width: "40%"}}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              style={{
                position: "relative",
                width: "80%",
                height: '100%',
                padding: "10px 5px",
                fontSize: '18px',
                outline: 'none',
                border: 'none',
              }}
            />

            <img
              src="https://s.gr-assets.com/assets/layout/header/icn_nav_search.svg"
              alt="search"
              height="20px"
              width="20px"
              style={{ 
                position: 'absolute',
                right: 10,
                top: "10px",
              }}
            />
          </Box>
        </Stack>
      </Stack>

      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginBottom: 2}}
        onClick={() => scroll(-390)}
      >
        <BsChevronBarUp />
      </Box>

      <Stack
        ref={ref}
        sx={{
          borderRight: '1px solid #382110',
          borderLeft: '1px solid #382110',
          padding: '15px 0',
          width: '50%',
          height: '400px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar':{
            width:0,
          }
        }}
        
      >
        
      </Stack> 
      
      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginTop: 2}}
        onClick={() => scroll(390)}
      >
        <BsChevronBarDown />
      </Box>
    </Stack>
  );
}

export default MessageModal;
