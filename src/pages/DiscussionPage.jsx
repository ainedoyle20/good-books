import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';

import useGlobalStore from '../store/globalStore';
import { 
  ScrollingContainer, 
  FriendItem, Loader,
  CreateMessage
} from '../components/reusable';
import { 
  fetchSpecificDiscussion, 
  fetchSpecificGroup, 
  addDiscussionContribution,
  formatDateString 
} from '../utils';

const DiscussionPage = () => {
  const { user } = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(true);
  const [discussion, setDiscussion] = useState(null);
  const [group, setGroup] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isNewDate, setIsNewDate] = useState(false);
  const [datedMessagesKey, setDatedMessagesKey] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // checking if user logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  // fetching discussin document by id
  useEffect(() => {
    const getDiscussionById = async (discussionId) => {
      const specificDiscussion = await fetchSpecificDiscussion(discussionId);
      // console.log("specificDiscussion: ", specificDiscussion);
      setDiscussion(specificDiscussion);
    }

    getDiscussionById(id);
    
  }, []);

  // checking if user is participant
  useEffect(() => {
    if (!discussion) return;

    const { participants } = discussion;

    const filteredParticipants = participants?.filter((participant) => (
      participant._id === user._id
    ))

    // IS a participant
    if (filteredParticipants?.length) setIsParticipant(true);
    
  }, [discussion]);

  // checking date for contributions
  useEffect(() => {
    if (!discussion) return;

    const { contributions } = discussion;

    if (!contributions?.length) {
      // There are no recorded dates (today's date has to be new)
      setIsNewDate(true);

    } else {

      // getting the date of the most recent contributions
      const { messageDate } = contributions[contributions.length -1] ? contributions[contributions.length -1] : null;

      // checking if the most recent recorded date is equal to today's date
      if (messageDate === new Date().toDateString()) {
        setIsNewDate(false);
      } else {
        setIsNewDate(true);
      }
    }

  }, [discussion]);

  // getting key 
  useEffect(() => {
    if (isNewDate || !discussion || !discussion.contributions?.length) {
      return;
    } else {
      // need to get key of most recent contributions object
      // needed for adding a contribution/message

      const { contributions } = discussion;
      const { _key } = contributions[contributions.length -1];
      setDatedMessagesKey(_key);
    }
  }, [isNewDate, discussion]);

  // fetching group by id
  useEffect(() => {
    if (!discussion) return;

    const getGroupById = async (groupId) => {
      if (!groupId) return;

      const specificGroup = await fetchSpecificGroup(groupId);
      // console.log("specificGroup: ", specificGroup);
      setGroup(specificGroup);
    }

    getGroupById(discussion.groupId);
    
  }, [discussion]);

  // checking if discussion in public
  // and checking if current user is a member of discussion's group
  useEffect(() => {
    if (!group) return;

    const checkIfMember = (userId, specificGroup) => {
      const {members} = specificGroup;

      if (!members?.length) setIsMember(false); // NOT member

      const filteredMembers = members.filter((member) => member._id === userId);

      if (filteredMembers.length) {
        // IS member
        setIsMember(true);

      } else {
        // NOT member
        setIsMember(false);
      }
    }

    const checkIfPublic = (specificGroup) => {
      if (specificGroup.public) {
        setIsPublic(true);
      } else {
        setIsPublic(false);
      }
    }

    checkIfMember(user._id, group);
    checkIfPublic(group);
    
  }, [group]);

  const handleContribute = async (contribution) => {
    setLoading(true);

    if (!isPublic && !isMember) {
      setLoading(false);
      alert("Sorry, this group is private. You must be a member to contribute.");
      return;
    }

    const success = await addDiscussionContribution(
      user._id, 
      discussion._id, 
      isParticipant,
      isNewDate,
      contribution,
      datedMessagesKey
    )

    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  if (!discussion || !user) {
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
        onClick={() => navigate(`/profile/${user?._id}`)}
      >
        Back
      </Typography>

      <Stack 
        width="50%"  display="flex" justifyContent="center" 
        alignItems="center" marginBottom="30px"
      >
        <Box sx={{ display: 'flex', marginBottom: "30px"}}>
          <Typography
            onClick={() => setShowDiscussion(true)}
            sx={{ 
              fontSize: 25, margin: '0 20px', color: '#382110', 
              fontWeight: '300', cursor: 'pointer',
              textDecoration: showDiscussion ? 'underline' : 'none',
            }}
          >
            {discussion?.discussionName.slice(0,30) + "..." || "discussion"}
          </Typography>
          <Typography
            onClick={() => setShowDiscussion(false)}
            sx={{
              fontSize: 25, margin: '0 20px', color: '#382110',
              fontWeight: '300', cursor: 'pointer',
              textDecoration: !showDiscussion ? 'underline' : 'none',
            }}
          >
            participants
          </Typography>
        </Box>
      </Stack>

      {showDiscussion ? (
        <ScrollingContainer isLarge={true} inDiscussion={true}>
          {loading ? (
            <Loader inScrollingContainer={true} />
          ) : (
            <>
              {discussion?.contributions?.map(({ _key, messageDate, texts }) => {
                const dateString = formatDateString(messageDate);
                return (
                  <Stack
                    key={_key}
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Typography color="#757575">
                      {dateString}
                    </Typography>

                    {texts.map(({text, postedBy}, idx) => (
                      <Box
                        key={`${text}-${idx}`}
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: postedBy._id === user?._id ? "flex-end" : "flex-start",
                          margin: "10px 0",
                          padding: "0 10px"
                        }}
                      >
                        <Typography width="40%" color="#bdbdbd" fontSize="14px" fontWeight="light"
                          paddingLeft="5px"
                        >
                          {postedBy?.userName}
                        </Typography>
                        <p
                          style={{ 
                            width: "40%", 
                            padding: "15px",  
                            borderRadius: "15px",
                            fontSize: "18px",
                            backgroundColor: postedBy._id === user?._id ? "#e3f2fd" : "#e0e0e0"
                          }}
                        >
                          {text}
                        </p>
                      </Box>
                    ))}
                  </Stack>
                );
              })}

              <CreateMessage 
                handleCreateMessage={handleContribute}
              />
            </> 
          )}
        </ScrollingContainer>
      ) : null}

      {!showDiscussion ? (
        <ScrollingContainer isLarge={true}>
          {
            discussion?.participants?.map((participant) => (
              <FriendItem
                key={participant._id}
                member={participant}
                inMessages={false}
                inGroup={true}
                user={user}
              />
            ))
          }

          {!discussion?.participants?.length 
            ? <Box 
                width="100%" height="100%" display="flex" flexDirection="column"  
                justifyContent="center" alignItems="center" color="#382110"
              >
                <Typography fontSize={30}>No one has participated in this discussion yet</Typography>
                <Typography fontSize={30}>Be the first to contribute!</Typography>
              </Box>
            : null
          }
        </ScrollingContainer>
      ) : null}

    </Stack>
  );
}

export default DiscussionPage;
