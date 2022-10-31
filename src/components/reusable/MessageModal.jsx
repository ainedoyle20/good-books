import React, {useState, useRef} from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs';

import CreateMessage from './CreateMessage';
import { sendMessage } from '../../utils';

const MessageModal = ({ messageObj, setShowMessageModal, user }) => {
  const [isCurrentDate, setIsCurrentDate] = useState(false);
  const ref = useRef();

  const {_key, messageFriend, datedMessages } = messageObj;

  const scroll = (scrollOffset) => {
    ref.current.scrollTop += scrollOffset;
  };

  const formatDateString = (str) => {
    let strArr = str.split(" ").slice(0, 3);

    const swap = (arr, idx1, idx2) => {
      return [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }
    swap(strArr, 1, 2);

    strArr[0] = strArr[0] + ",";

    let formattedStr = strArr.join(" ");

    return formattedStr;
  }

  const checkIfNewDate = () => {
    const currentDateString = new Date().toDateString();
    const dateString = datedMessages[datedMessages.length-1]?.messageDate;
    if (currentDateString === dateString) {
      console.log("NOT new date");
      return false;
    } else {
      console.log("IS new date");
      return true;
    }
  }

  const handleCreateMessage = async (message) => {
    const isNewDate = checkIfNewDate();

    if (isNewDate) {
      await sendMessage(user._id, messageFriend._id, _key, false, isNewDate, message);
      window.location.reload();
    } else {
      const messageKey = datedMessages[datedMessages.length - 1]._key;
      await sendMessage(user._id, messageFriend._id, _key, messageKey, isNewDate, message);
      window.location.reload();
    }
    
  }

  return (
    <Stack
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingTop="40px"
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
          src={messageFriend?.image}
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
          {messageFriend?.userName}
        </Typography>

      </Stack>

      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginBottom: 3}}
        onClick={() => scroll(-390)}
      >
        <BsChevronBarUp />
      </Box>

      <Stack
        ref={ref}
        sx={{
          position: "relative",
          border: '1px solid #382110',
          borderTop: "none",
          borderBottom: "none",
          paddingTop: '15px',
          width: '50%',
          height: '500px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar':{
            width:0,
          }
        }}
        
      >
        {datedMessages.map(({ _key, messageDate, texts }) => {
          const dateString = formatDateString(messageDate);
          return (
            <Stack
              key={_key}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Typography
                color="#757575"
              >
                {dateString}
              </Typography>

              {texts.map(({text, postedBy}, idx) => (
                <Box
                  key={`${text}-${idx}`}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: postedBy._id === user._id ? "flex-end" : "flex-start",
                    margin: "10px 0",
                    padding: "0 10px"
                  }}
                >
                  <p
                    style={{ 
                      width: "40%", 
                      padding: "15px",  
                      borderRadius: "15px",
                      fontSize: "18px",
                      backgroundColor: postedBy._id === user._id ? "#e3f2fd" : "#e0e0e0"
                    }}
                  >
                    {text}
                  </p>
                </Box>
              ))}
            </Stack>
          );
        })}

        <CreateMessage handleCreateMessage={handleCreateMessage} />
      </Stack> 
      
      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginTop: 4}}
        onClick={() => scroll(390)}
      >
        <BsChevronBarDown />
      </Box>
    </Stack>
  );
}

export default MessageModal;
