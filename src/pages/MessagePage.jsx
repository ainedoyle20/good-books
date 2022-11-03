import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';
import { BiArrowBack } from "react-icons/bi";

import useGlobalStore from '../store/globalStore';
import { ScrollingContainer, CreateMessage, Loader } from '../components/reusable';
import { checkIfMessaged, createSanityMessageObj, sendMessage, sendMessageNewDate } from '../utils';

const MessagePage = () => {
  const { user, userDetails, updateNavSection } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [messageObject, setMessageObject] = useState(null);
  const [isNewDate, setIsNewDate] = useState(false);
  const [objectKey, setObjectKey] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  useEffect(() => {
    if (!userDetails || !user) return;
    // console.log("userDetails: ", userDetails);
    const { messagedUsers } = userDetails;

    // function for creating sanity message object
    const createAndGetMessageObject = async () => {
      const messageObj = await createSanityMessageObj(user._id, id);
      console.log("returned messageObj: ", messageObj)
      setMessageObject(messageObj);
    }

    if (!messagedUsers?.length) {
      // NOT a messaged friend
      createAndGetMessageObject();
      console.log("NOT MESSAGE FRIEND");
    } else {
      // check if friend is in messaged users array 
      // result: { isMessageFriend: true || false, messageObj: {} || null}
      const result = checkIfMessaged(messagedUsers, id);
      
      if (result.isMessageFriend) { 
        // IS a messaged friend
        setMessageObject(result.messageObj);

      } else { 
        // NOT a messaged friend
        createAndGetMessageObject();
        console.log("NOT MESSAGE FRIEND");
      }

    }
  }, [userDetails, user]);

  useEffect(() => {
    if (messageObject === null || !user) return;

    const { datedMessages } = messageObject;
    // console.log("datedMessages: ", datedMessages);

    // Check if todays date matches the most recent dated messages
    const todaysDateString = new Date().toDateString();

    if (!datedMessages?.length) {
      // IS new date
      setIsNewDate(true);
      
    } else {
      // check date string of most recent dated message object in datedMessages
      const lastDatedMessageObject = datedMessages[datedMessages.length -1];
      const messageDateString = lastDatedMessageObject.messageDate;

      if (messageDateString === todaysDateString) {
        // NOT new date
        setIsNewDate(false);
        // Get dated message object _key for adding text to sanity
        const datedMessageObjKey = lastDatedMessageObject._key;
        setObjectKey(datedMessageObjKey);
      } else {
        // IS new date
        setIsNewDate(true);
        console.log("IS NEW DATE");
      }
    }

  }, [messageObject]);

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

  const handleCreateMessage = async (text) => {
    if (!text || !user || messageObject === null) return;

    if (!text.trim().length) {
      alert("Your message must have content");
      return;
    }

    setIsLoading(true);

    if (isNewDate) {
      await sendMessageNewDate(user._id, id, messageObject._key, text);
      setTimeout(() => {
        window.location.reload();
      }, 4000)
    } else {
      await sendMessage(user._id, id, messageObject._key, objectKey, text);
      setTimeout(() => {
        window.location.reload();
      }, 4000)
    }
  }

  return (
    <Stack width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Typography 
        position="absolute" top="90px" left="50px" display="flex" alignItems="center" gap={1} fontSize="18px"
        sx={{ cursor: "pointer", ":hover": { fontSize: "18.5px"} }}
        onClick={() => {
          if (!user) return;
          updateNavSection("messages_section");
          navigate(`/profile/${user?._id}`);
        }}
      >
        <BiArrowBack />
        Messages
      </Typography>

      <Stack width="50%" display="flex" justifyContent="center" alignItems="center" marginTop="70px">
        <img
          alt="profile"
          src={messageObject?.messageFriend?.image 
            ? messageObject.messageFriend.image 
            : "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
          }
          // src={messageFriend?.image}
          onError={(e) => {
            e.target.src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
            e.onerror=null
          }}
          style={{
            width: "60px",
            height: "60px",
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
          {messageObject?.messageFriend?.userName
            ? messageObject.messageFriend.userName
            : "Message Friend"
          } 
        </Typography>

      </Stack>

      <ScrollingContainer isLarge={true} inDiscussion={true} messageObject={messageObject}>
        {messageObject !== null && user && !isLoading ? (
          <Stack width="100%" height="auto" paddingBottom="20px">
            {messageObject.datedMessages.map(({ _key, messageDate, texts }) => {
              const dateString = formatDateString(messageDate);
              return (
                <Stack
                  key={_key}
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px"
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
                        justifyContent: postedBy._id === user?._id ? "flex-end" : "flex-start",
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
          </Stack>
        ) : (
          <Loader inScrollingContainer={true} />
        )}
        
        <CreateMessage handleCreateMessage={handleCreateMessage} isLoading={isLoading} />
      </ScrollingContainer>
    </Stack>
  );
}

export default MessagePage;
