import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useGlobalStore from "../../store/globalStore";

const MemberItem = ({ member, handleBlockUser, groupOrDiscussion, handleUnBlockUser }) => {
  const { updateNavSection } = useGlobalStore();
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUnblock, setShowUnblock] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupOrDiscussion || !member) return;
    setIsLoading(true);

    console.log("checking if blocked");

    if (!groupOrDiscussion.blockedUsers?.length) {
      setIsBlocked(false);
      setIsLoading(false);
      return;
    }

    const { blockedUsers } = groupOrDiscussion;
    const filteredBlockedUsers = blockedUsers.filter((blockedUser) => blockedUser._ref === member._id);
    if (filteredBlockedUsers.length) {
      setIsBlocked(true);
    } else {
      setIsBlocked(false);
    }
    setIsLoading(false);

  }, [groupOrDiscussion, member]);

  return (
    <Stack 
      direction="row" display="flex" justifyContent="center" alignItems="center"
      margin="15px 0" padding="10px" borderTop="1px solid #382110" borderBottom="1px solid #382110"
      sx={{ ':hover': { padding: "9.5px" } }}
    >
      <img 
        alt="user profile"
        src={member.image}
        height="40px"
        width="40px"
        style={{ borderRadius: "100%", margin: '0 15px 0 10px'}}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // to prevent looping
          currentTarget.src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
        }}
      />

      <Typography component="span" sx={{ width: '300px', cursor: "pointer", fontSize: {xs: "16px", md: "20px"}, overflow: "hidden" }}
        onClick={() => { 
          updateNavSection("profile_section");
          navigate(`/profile/${member._id}`);
        }}
      >
        {member?.userName}
      </Typography>

      <Box sx={{ width: '90%', display: 'flex', justifyContent: 'flex-end', paddingRight: '15px', position: "relative" }}>
        {isLoading ? (
          <Typography width="75px" height="38px" 
            sx={{ backgroundColor: "#efebe9", padding: {xs: "3px 10px", md: "5px 15px"}, fontSize: {xs: "16px", md: "18px"} }}
            display="flex" justifyContent="center" alignItems="center"
          >
            ...
          </Typography>
        ) : (
          <Typography
            borderRadius="10%"
            sx={{ backgroundColor: "#efebe9", cursor: 'pointer',
              padding: {xs: "3px 10px", md: "5px 15px"},
              fontSize: {xs: "16px", md: "18px"}
            }}
            onClick={() => {
              if (isBlocked) {
                setShowUnblock((prev) => !prev);
              } else {
                handleBlockUser(member._id)
              }
            }} 
          >
            {isBlocked ? "Blocked" : "Block"}
          </Typography>
        )}

        {showUnblock ? (
          <Typography
            position="absolute" marginRight="120px"
            borderRadius="10%" fontSize='18px'
            sx={{ 
              backgroundColor: "#efebe9", 
              cursor: 'pointer',
              padding: {xs: "3px 10px", md: "5px 15px"} 
            }}
            onClick={() => {
              handleUnBlockUser(member._id);
              setShowUnblock(false);
            }} 
          >
            Unblock
          </Typography>
        ) : null}
      </Box>
    </Stack>
  )
}

export default MemberItem;
