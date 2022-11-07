import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';
import { BiArrowBack } from "react-icons/bi"

import useGlobalStore from '../store/globalStore';
import { ScrollingContainer, Loader } from '../components/reusable';
import { DiscussionModal } from '../components/reusable/modals';
import { DiscussionItem, MemberItem } from '../components/reusable/list-items';
import { 
  fetchSpecificGroup, addUserToGroup, createDiscussion, deleteGroup,
  blockUserInGroup, unBlockUserInGroup
} from '../utils';

const GroupPage = () => {
  const { user, updateNavSection } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showDiscussions, setShowDiscussions] = useState(true);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [group, setGroup] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  const getGroupById = async (groupId) => {
    const specificGroup = await fetchSpecificGroup(groupId);
    setGroup(specificGroup);
  }

  useEffect(() => {
    getGroupById(id);
  }, [id]);

  useEffect(() => {
    if (!group) return;
    setIsLoading(false);

    const { members, removedMembers } = group;

    const checkAndRecordUserGroupStatus = (groupUserList, settingFunc) => {
      if (!groupUserList || !groupUserList?.length) {
        settingFunc(false); // NOT in list
        return;
      }
  
      const filteredList = groupUserList?.filter((groupUser) => (
        groupUser._id === user._id
      ))
     
      if (filteredList?.length) { // IS in list
        settingFunc(true);
      } else {                 // NOT in list
        settingFunc(false);
      }
    }

    // checking if user is group member
    checkAndRecordUserGroupStatus(members, setIsMember);
    // checking if user is group member
    checkAndRecordUserGroupStatus(removedMembers, setIsBlocked);

    // eslint-disable-next-line
  }, [group]);

  const handleJoinGroup = async () => {
    if (user?._id === group.postedBy._id) {
      alert("As the creator of this group you are already a group member");
      return;
    }

    if (isMember) {
      alert("You are already a member!");
      return;
    }

    if (isBlocked) {
      alert("Sorry, you have been blocked by the creator of this group and cannot join");
      return;
    }
    setIsLoading(true);

    console.log("joining group...");
    await addUserToGroup(group?._id, user?._id);
    await getGroupById(id);
  }

  const handleDeleteGroup = async () => {
    console.log("deleting group");
    await deleteGroup(group?._id, group?.members, group?.discussions);
    updateNavSection("groups_section");
    navigate(`/profile/${user?._id}`);
  }

  const handleCreateDiscussion = async (discussionName) => {
    if (!discussionName) return;
    setIsLoading(true);

    const success = await createDiscussion(user._id, discussionName, group?._id, group?.groupName);

    if (success) {
      getGroupById(group?._id);
    }
  }

  const handleBlockUser = async (toBlockId) => {
    if (user?._id === toBlockId) {
      alert("You cannot block yourself");
      return;
    }

    if (user?._id !== group?.postedBy._id) {
      alert("Sorry, only the creator of a group can block a member");
      return;
    }

    await blockUserInGroup(group._id, toBlockId);
    getGroupById(group?._id);
  }

  const handleUnBlockUser = async (toUnblockId) => {
    if (user?._id === toUnblockId) {
      alert("You cannot unblock yourself");
      return;
    }

    if (user?._id !== group?.postedBy._id) {
      alert("Sorry, only the creator of a group can unblock a blocked user");
      return;
    }

    await unBlockUserInGroup(group._id, toUnblockId);
    getGroupById(group?._id);
  }

  if (!user) {
    return <Loader />;
  }

  return (
    <Stack
      width="100vw" height="100vh" display="flex"
      alignItems="center" justifyContent="center" paddingTop="30px"
    >
      {/* Back to Groups section button */}
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
        direction="row" width="900px" justifyContent="center" alignItems="center" 
        marginBottom="20px" paddingX="50px"
      >
        <Box width="50%" display="flex" justifyContent="flex-start" gap={5}>
          <Typography sx={{ cursor: "pointer"}}
            onClick={() => setShowDiscussionModal(true)}
          >
            Start Discussion
          </Typography>

          <Typography sx={{ cursor: "pointer", display: user?._id === group?.postedBy._id ? "none" : "block"}}
            onClick={handleJoinGroup}
          >
            Join Group
          </Typography>
        </Box>

        <Box width="50%" display="flex" justifyContent="flex-end">
          {user?._id === group?.postedBy._id ? (
            <Typography sx={{ cursor: "pointer"}}
              onClick={handleDeleteGroup}
            >
              Delete Group
            </Typography>
          ) : null}
        </Box>
      </Stack>

      {showDiscussions && !showDiscussionModal ? (
        <ScrollingContainer isLarge={true}>
          {isLoading || !group ? (
            <Loader inScrollingContainer={true} />
          ) : (
            <>
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
            </>
          )}
        </ScrollingContainer>
      ) : null}

      {!showDiscussions && !showDiscussionModal ? (
        <ScrollingContainer isLarge={true}>
          {isLoading || !group ? (
            <Loader inScrollingContainer={true} />
          ) : (
            <>
              {
                group?.members?.map((member) => (
                  <MemberItem
                    key={member._id}
                    member={member}
                    handleBlockUser={handleBlockUser}
                    handleUnBlockUser={handleUnBlockUser}
                    groupOrDiscussion={group}
                  />
                ))
              }
            </>
          )}
        </ScrollingContainer>
      ) : null}

      {showDiscussionModal ? (
        <DiscussionModal
          user={user}
          setShowDiscussionModal={setShowDiscussionModal}
          handleCreateDiscussion={handleCreateDiscussion}
          groupId={group._id}
          groupName={group.groupName}
        />
      ) : null}
    </Stack>
  );
}

export default GroupPage;
