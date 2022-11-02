import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';

import useGlobalStore from '../store/globalStore';
import { ScrollingContainer, CreateMessage, Loader } from '../components/reusable';
import { checkIfMessaged, createSanityMessageObj } from '../utils';

const MessagePage = () => {
  const { user, userDetails} = useGlobalStore();
  const [messageObject, setMessageObject] = useState(null);

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

  return (
    <Stack width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Stack width="50%" display="flex" justifyContent="center" alignItems="center" marginTop="30px">
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
        {messageObject !== null && user ? (
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
        
        <CreateMessage />
      </ScrollingContainer>
    </Stack>
  )
}

export default MessagePage;
