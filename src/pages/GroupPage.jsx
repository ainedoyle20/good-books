import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';

import useGlobalStore from '../store/globalStore';
import { 
  ScrollingContainer, DiscussionItem, 
  FriendItem, Loader,
  DiscussionModal 
} from '../components/reusable';
import { fetchSpecificGroup } from '../utils';

const GroupPage = () => {
  const { user } = useGlobalStore();
  const [showDiscussions, setShowDiscussions] = useState(true);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [group, setGroup] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const getGroupById = async (groupId) => {
      const specificGroup = await fetchSpecificGroup(groupId);
      console.log("specificGroup: ", specificGroup);
      setGroup(specificGroup);
    }

    getGroupById(id);
    
  }, []);

  if (!group) {
    return <Loader />;
  }

  return (
    <Stack
      width="100vw" height="100vh" display="flex"
      alignItems="center" justifyContent="center" paddingTop="30px"
    >
      <Typography 
        position="absolute" top="90px" left="50px"
        fontSize={20} fontWeight="600" 
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        Back
      </Typography>

      <Stack 
        sx={{ display: showDiscussionModal ? "none" : "flex"}}
        width="50%" justifyContent="center" 
        alignItems="center" marginBottom="30px"
      >
        <Box sx={{ display: 'flex', marginBottom: "30px"}}>
          <Typography
            onClick={() => setShowDiscussions(true)}
            sx={{ 
              fontSize: 25, margin: '0 20px', color: '#382110', 
              fontWeight: '300', cursor: 'pointer',
              textDecoration: showDiscussions ? 'underline' : 'none',
            }}
          >
            group discussions
          </Typography>
          <Typography
            onClick={() => setShowDiscussions(false)}
            sx={{
              fontSize: 25, margin: '0 20px', color: '#382110',
              fontWeight: '300', cursor: 'pointer',
              textDecoration: !showDiscussions ? 'underline' : 'none',
            }}
          >
            group members
          </Typography>
        </Box>

        <Box width="100%" display="flex" justifyContent="flex-start">
          <Typography fontSize="18px" sx={{ cursor: "pointer"}}
            onClick={() => setShowDiscussionModal(true)}
          >
            Start Discussion
          </Typography>
        </Box>
      </Stack>

      {showDiscussions && !showDiscussionModal ? (
        <ScrollingContainer isLarge={true}>
          {group?.discussions?.length 
            ? group.discussions.map((discussion) => (
                <DiscussionItem 
                  key={discussion._id}
                  discussion={discussion}
                />
              ))
            : null
          }

          {/* If no discussions */}
          {!group?.discussions?.length 
            ? <Typography
                width="100%" height="100%" display="flex" justifyContent="center" 
                alignItems="center" fontSize={30} color="#382110"
              >
                This group has no discussions <br/>
                &emsp; &emsp; &emsp; Be the first to start one!
              </Typography>

            : null
          }
        </ScrollingContainer>
      ) : null}

      {!showDiscussions && !showDiscussionModal ? (
        <ScrollingContainer isLarge={true}>
          {
            group?.members?.map((member) => (
              <FriendItem
                key={member._id}
                member={member}
                inMessages={false}
                inGroup={true}
                user={user}
              />
            ))
          }
        </ScrollingContainer>
      ) : null}

      {showDiscussionModal ? (
        <DiscussionModal
          user={user}
          setShowDiscussionModal={setShowDiscussionModal}
          groupId={group._id}
          groupName={group.groupName}
        />
      ) : null}
    </Stack>
  );
}

export default GroupPage;
