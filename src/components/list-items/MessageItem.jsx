import React, {useState, useEffect} from 'react';
import { Box } from '@mui/material';

const MessageItem = ({ message, openMessagePage }) => {
  // console.log("message", message);
  const [textMessage, setTextMessage] = useState("");

  const { datedMessages, messageFriend } = message;

  useEffect(() => {
    
    if (datedMessages?.length) {
      const last = datedMessages[datedMessages.length -1];

      setTextMessage(last.texts[last.texts.length-1]?.text || "");
      // console.log("last text: ", last.texts[last.texts.length-1]?.text);
    } else {
      setTextMessage("");
    }

  }, [datedMessages]);

  return (
    <Box
      onClick={() => openMessagePage(messageFriend._id)}
      sx={{
        display: "flex",
        alignItems: 'center',
        padding: "10px",
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': { padding: "9.5px" },
        cursor: 'pointer',
      }}
    >
      
      <img 
        alt="user profile"
        src={message?.messageFriend?.image ? message.messageFriend.image : "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"}
        height="40px"
        width="40px"
        style={{ borderRadius: "50%", marginRight: "10px", maginLeft: "10px"}}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // to prevent looping
          currentTarget.src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
        }}
      />


      <Box component="span" 
        sx={{ fontSize: {xs: "16px", md: "20px"}, width: '200px', overflow: "hidden" }}
      >
        {message?.messageFriend?.userName}
      </Box>

      <Box component="span" 
        sx={{ fontSize: 16, width: '100%', overflow: 'hidden', color: "#616161"  }}
      >
        {textMessage?.length > 65 ? `${textMessage.slice(0, 65)}...`: `${textMessage}`}
      </Box>
      
    </Box>
  )
}

export default MessageItem;
