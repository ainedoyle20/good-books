import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';
import { BiArrowBack } from "react-icons/bi"

import useGlobalStore from '../store/globalStore';
import { 
  ScrollingContainer, DiscussionItem, 
  FriendItem, Loader,
  DiscussionModal 
} from '../components/reusable';
import { fetchSpecificGroup } from '../utils';

const GroupPage = () => {
  const { user, updateNavSection } = useGlobalStore();
  const [showDiscussions, setShowDiscussions] = useState(true);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [group, setGroup] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const getGroupById = async (groupId) => {
      const specificGroup = await fetchSpecificGroup(groupId);
      // console.log("specificGroup: ", specificGroup);
      setGroup(specificGroup);
    }

    getGroupById(id);
    
  }, []);

  const handleDeleteGroup = async () => {
    console.log("deleting group");
    // const success = await deleteGroups(selectedGroups);
    // if (success) {
    //   window.location.reload();
    // }
  }

  if (!group || !user) {
    return <Loader />;
  }

  return (
    <Stack
      width="100vw" height="100vh" display="flex"
      alignItems="center" justifyContent="center" paddingTop="30px"
    >
      <Typography 
        position="absolute" top="90px" left="50px" display="flex" alignItems="center" gap={1} fontSize="18px"
        sx={{ cursor: "pointer", ":hover": { fontSize: "18.5px"} }}
        onClick={() => {
          if (!user) return;
          updateNavSection("groups_section");
          navigate(`/profile/${user?._id}`);
        }}
      >
        <BiArrowBack />
        Groups
      </Typography>

      <Stack 
        sx={{ display: showDiscussionModal || !group ? "none" : "flex"}}
        width="50%" justifyContent="center" alignItems="center" marginBottom="20px"
      >
        <Box sx={{ display: 'flex'}}>
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
      </Stack>

      <Stack
        sx={{ display: showDiscussionModal || !group ? "none" : "flex"}}
        direction="row" width="70%" justifyContent="center" alignItems="center" 
        marginBottom="20px" paddingX="50px"
      >
        <Box width="50%" display="flex" justifyContent="flex-start" gap={5}>
          <Typography sx={{ cursor: "pointer"}}
            onClick={() => setShowDiscussionModal(true)}
          >
            Start Discussion
          </Typography>

          <Typography sx={{ cursor: "pointer", display: user?._id === group?.postedBy._id ? "none" : "block"}}
            onClick={() => {
              if (user?._id === group?.postedBy._id) return;
              // join group function
            }}
          >
            Join Group
          </Typography>
        </Box>

        <Box width="50%" display={user?._id === group?.postedBy._id ? "flex" : "none"} justifyContent="flex-end">
          <Typography sx={{ cursor: "pointer"}}
            onClick={handleDeleteGroup}
          >
            Delete Group
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
