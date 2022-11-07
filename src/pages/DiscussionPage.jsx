import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';
import { BiArrowBack } from "react-icons/bi";

import useGlobalStore from '../store/globalStore';
import { ScrollingContainer, Loader, CreateMessage } from '../components/reusable';
import { MemberItem } from "../components/reusable/list-items";
import { 
  fetchSpecificDiscussion, 
  fetchSpecificGroup, 
  addContribution,
  addContributionNewDate,
  formatDateString,
  blockUserInDiscussion,
  unBlockUserInDiscussion
} from '../utils';

const DiscussionPage = () => {
  const { user, updateNavSection } = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(true);
  const [discussion, setDiscussion] = useState(null);
  const [group, setGroup] = useState(null);
  const [isBlockedUser, setIsBlockedUser] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isNewDate, setIsNewDate] = useState(false);
  const [objectKey, setObjectKey] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // checking if user logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    // eslint-disable-next-line
  }, [user]);

  const getDiscussionById = async (discussionId) => {
    const specificDiscussion = await fetchSpecificDiscussion(discussionId);
    setDiscussion(specificDiscussion);
    setLoading(false);
  }

  // fetching discussin document by id
  useEffect(() => {
    getDiscussionById(id);
  }, [id]);

  // checking if user is participant
  useEffect(() => {
    if (!discussion || !user) return;

    const { participants } = discussion;
    const { id: userId} = user;

    if (!participants.length) {
      setIsParticipant(false);
      return;
    }

    const filteredParticipants = participants?.filter((participant) => (
      participant._id === userId
    ))

   
    if (filteredParticipants?.length) { // IS a participant
      setIsParticipant(true);
    } else {                 // NOT a participant
      setIsParticipant(false);
    }
  }, [discussion, user]);

  // checking if today's date is recorded
  useEffect(() => {
    if (!discussion) return;

    const { contributions } = discussion;

    if (!contributions.length) {
      // There are no recorded dates (today's date has to be new)
      setIsNewDate(true);

    } else {
      // getting the LAST RECORDED DATE and comparing to TODAYS DATE
      const lastDatedObject = contributions[contributions.length -1];
      const lastDateString = lastDatedObject.messageDate;
      const todaysDateString = new Date().toDateString();

      if (lastDateString === todaysDateString) {
        // Todays date is recorded already (NOT new date)
        setIsNewDate(false);

        // getting dated object _key (for adding contributions into correct dated object in sanity)
        const datedContributionKey = lastDatedObject._key;
        setObjectKey(datedContributionKey);

      } else {
        // Todays date isn't recorded (IS new date)
        setIsNewDate(true);
      }
    }

  }, [discussion]);

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

  // checking if discussion is PUBLIC and if current user is a MEMBER of discussion's group
  useEffect(() => {
    if (!group || !user || !discussion) return;

    const { id: userId } = user;

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

    const checkIfBlocked = (userId, specificGroup, specificDiscussion) => {
      if (specificGroup.blockedUsers?.length) {
        const filtered = specificGroup.blockedUsers.filter((blockedUser) => (
          blockedUser._ref === userId
        ));
        if (filtered.length) setIsBlockedUser(true);
      }

      if (specificDiscussion.blockedUsers?.length) {
        const filteredList = specificDiscussion.blockedUsers.filter((blockedUser) => (
          blockedUser._ref === userId
        ));
        if (filteredList.length) setIsBlockedUser(true);
      }
    }

    checkIfMember(userId, group);
    checkIfPublic(group);
    checkIfBlocked(userId, group, discussion);
    
  }, [group, user, discussion]);

  const handleContribute = async (contribution) => {
    if (!isPublic && !isMember) {
      alert("Sorry, this group is private. You must be a member to contribute.");
      return;
    }

    if (isBlockedUser) {
      alert("Sorry, it seems you are blocked from either this discussion or it's group. You cannot contribute.");
      return;
    }
  
    setLoading(true);

    if (isNewDate) {
      await addContributionNewDate(user._id, id, isParticipant, contribution);
    } else {
      await addContribution(user._id, id, objectKey, isParticipant, contribution);
    }

    setTimeout(() => {
      getDiscussionById(id);
    }, 1000)
  }

  const handleBlockUser = async (toBlockId) => {
    if (user?._id === toBlockId) {
      alert("You cannot block yourself");
      return;
    }

    if (user?._id !== discussion?.creator?._id && user?._id !== group?.postedBy?._id) {
      alert(`Sorry, only the creator of this discussion 
        or the creator of this group can block a participant`
      );
      return;
    }

    await blockUserInDiscussion(discussion?._id, toBlockId);
    getDiscussionById(discussion?._id);
  }

  const handleUnBlockUser = async (toUnblockId) => {
    if (user?._id === toUnblockId) {
      alert("You cannot unblock yourself");
      return;
    }

    if (user?._id !== discussion?.creator?._id && user?._id !== group?.postedBy?._id) {
      alert(`Sorry, only the creator of this discussion 
        or the creator of this group can unblock a blocked participant`
      );
      return;
    }

    await unBlockUserInDiscussion(discussion?._id, toUnblockId);
    getDiscussionById(discussion?._id);
  }

  return (
    <Stack
      width="100vw" height="100vh" display="flex"
      alignItems="center" justifyContent="center" 
      sx={{ paddingTop: { xs: "140px", md: "80px" }}}
    >
      <Typography 
        position="absolute" top="90px" left="50px" display="flex" alignItems="center" gap={1} fontSize="18px"
        sx={{ cursor: "pointer", ":hover": { fontSize: "18.5px"} }}
        onClick={() => {
          if (!user) return;
          updateNavSection("discussions_section");
          navigate(`/profile/${user?._id}`);
        }}
      >
        <BiArrowBack />
        Discussions
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
        <ScrollingContainer isLarge={true} inDiscussion={true} discussion={discussion}>
          {loading || !discussion ? (
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
                      alignItems: "center",
                      marginBottom: "20px"
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

              {discussion && !discussion.contributions.length ? (
                <Typography width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" fontSize="20px">
                  Be the first to contribute
                </Typography>
              ) : null}

              <CreateMessage 
                handleCreateMessage={handleContribute}
                isLoading={loading}
              />
            </> 
          )}
        </ScrollingContainer>
      ) : null}

      {!showDiscussion ? (
        <ScrollingContainer isLarge={true}>
          {discussion && discussion?.participants?.length 
            ? discussion.participants?.map((participant) => (
                <MemberItem
                  key={participant._id}
                  member={participant}
                  handleBlockUser={handleBlockUser}
                  handleUnBlockUser={handleUnBlockUser}
                  groupOrDiscussion={discussion}
                />
              ))
            : null
          }

          {discussion && !discussion?.participants?.length 
            ? <Box 
                width="100%" height="100%" display="flex" flexDirection="column"  
                justifyContent="center" alignItems="center" color="#382110"
              >
                <Typography fontSize={30}>No one has participated in this discussion yet</Typography>
                <Typography fontSize={30}>Be the first to contribute!</Typography>
              </Box>
            : null
          }

          {!discussion
            ? <Loader inScrollingContainer={true} />
            : null
          }
        </ScrollingContainer>
      ) : null}

    </Stack>
  );
}

export default DiscussionPage;
