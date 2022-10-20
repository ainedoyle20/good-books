import React, {useState, useEffect} from 'react';
import { Box } from '@mui/material';

const MessageItem = ({ message, handleClickedMessagedFriend }) => {
  const [textMessage, setTextMessage] = useState("");

  useEffect(() => {
    
    const lastDatedMessageObject = message.textMessages[message.textMessages.length -1];
    const {messages} = lastDatedMessageObject;
    if (messages?.length) {
      setTextMessage(messages[messages.length-1]?.text);
    } else {
      setTextMessage("");
    }

  }, []);

  return (
    <Box
      onClick={() => {
        console.log("open message modal: ", message);
        handleClickedMessagedFriend(message);
      }}
      sx={{
        display: "flex",
        alignItems: 'center',
        padding: "10px",
        margin: '15px 0',
        borderTop: '1px solid #382110',
        borderBottom: '1px solid #382110',
        ':hover': { borderTop: '3px solid #382110', borderBottom: '3px solid #382110'},
        cursor: 'pointer',
      }}
    >
      <img 
        alt="user profile picture"
        src={message?.messageFriend?.image}
        height="40px"
        width="40px"
        style={{ borderRadius: "100%", margin: '0 15px 0 10px'}}
      />

      <Box component="span" 
        sx={{ fontSize: 20, width: '400px', }}
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
