import React, {useState} from 'react';
import { Box } from '@mui/material';
import { HiArrowUp } from 'react-icons/hi'

const CreateMessage = ({ handleCreateMessage, isLoading }) => {
  const [createdMessage, setCreatedMessage] = useState("");

  return (
    <Box width="100%" position="absolute" bottom="0"
      display="flex" alignItems="center" justifyContent="center"
      sx={{  backgroundColor: "#f4f1ea" }}
    >
      <textarea
        type="text"
        value={createdMessage}
        onChange={(e) => setCreatedMessage(e.target.value)}
        placeholder="Message"
        style={{
          minWidth: "80%",
          maxWidth: "80%",
          fontSize: "18px",
          padding: "5px 10px",
          border: 'none',
          outline: 'none',
          margin: "20px 0",
          borderRadius: "20px",
          height: "auto",
          minHeight: "30px",
          maxHeight: "100px",
        }}
      />

      <button
        disabled={isLoading || !createdMessage.trim().length}
        type="button"
        onClick={() => {
          if (createdMessage.length && createdMessage.trim().length) {
            console.log("Sending message...");
            handleCreateMessage(createdMessage);
            setCreatedMessage("");
          }
        }}
        style={{
          borderRadius: "100%",
          margin: "0 10px",
          padding: "5px",
          fontSize: "18px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: createdMessage.length && createdMessage.trim().length ? "white" : "#382110",
          backgroundColor: createdMessage.length && createdMessage.trim().length ? "#382110" : "#f4f1ea",
          opacity: createdMessage.length && createdMessage.trim().length ? "1" : "0.2",
          border: createdMessage.length && createdMessage.trim().length ? "none" : '1px solid #382110',
          cursor: createdMessage.length && createdMessage.trim().length ? "pointer" : "default"
        }}
      >
        <HiArrowUp />
      </button>
    </Box>
  );
}

export default CreateMessage;
