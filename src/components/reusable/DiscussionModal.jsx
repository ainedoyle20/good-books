import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md";

import { createDiscussion } from '../../utils';
import Loader from './Loader';

const DiscussionModal = ({ user, setShowDiscussionModal, groupId, groupName }) => {
  const [discussionName, setDiscussionName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateDiscussion = async () => {
    setLoading(true);
    // console.log("groupId: ", groupId, "groupName: ", groupName);
    const success = await createDiscussion(user._id, discussionName, groupId, groupName);

    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <Stack
      borderRight="1px solid #382110" borderLeft="1px solid #382110"
      paddingTop="10%" width= "70%" height="600px"
      display="flex" alignItems="center" position="relative"
    >
      
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box position="absolute" top="20px" right="40px"
            fontSize="30px" sx={{ cursor: "pointer"}}
          >
            <MdOutlineCancel 
              onClick={() => setShowDiscussionModal(false)}
            />
          </Box>

          <Typography variant='h5' color="#382110">
            Just decide on a discussion name to get started
          </Typography>

          <input 
            type="text"
            value={discussionName}
            onChange={(e) => setDiscussionName(e.target.value)}
            placeholder="E.g. Discussing How to kill a Mockingjay"
            required
            style={{
              margin: "40px 20px",
              padding: "20px",
              fontSize: "20px",
              border: "none",
              outline: "none",
              borderRadius: "15px",
              width: "45%"
            }}
          />

          <Typography
            fontSize="20px" fontWeight="600" color="#382110"
            padding="5px 10px" borderRadius="10px"
            sx={{ backgroundColor: "#F4F1EA", cursor: "pointer" }}
            onClick={handleCreateDiscussion}
          >
            Create Discussion
          </Typography>
        </>
      )}

    </Stack>
  );
}

export default DiscussionModal;
