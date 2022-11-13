import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import useGlobalStore from '../../store/globalStore';
import { ScrollingContainer } from '../reusable';
import { DiscussionItem } from "../list-items";
import { fetchMyDiscussions, fetchPublicDiscussions } from '../../utils';

const DiscussionsSection = () => {
  const { user } = useGlobalStore();
  const [showMyDiscussions, setShowMyDiscussions] = useState(true);
  const [myDiscussions, setMyDiscussions] = useState([]);
  const [publicDiscussions, setPublicDiscussions] = useState([]);

  const [myFilteredDiscussions, setMyFilteredDiscussions] = useState([]);
  const [filteredPublicDiscussions, setFilteredPublicDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) return;

    const sortAndSetDiscussions = async () => {
      // my discussions
      const myDiscussionsList = await fetchMyDiscussions(user._id);
      // console.log("myDiscussionsList: ", myDiscussionsList);
      setMyDiscussions(myDiscussionsList);
      setMyFilteredDiscussions(myDiscussionsList);

      // public discussions
      const publicDiscussionsList = await fetchPublicDiscussions();
      // console.log("publicDiscussionsList: ", publicDiscussionsList);
      setPublicDiscussions(publicDiscussionsList);
      setFilteredPublicDiscussions(publicDiscussionsList);
    }

    sortAndSetDiscussions();

    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!searchTerm.length) return;

    // search my discussions
    if (showMyDiscussions) {
      if (!myDiscussions.length) return;

      const filtered = myDiscussions.filter((discussion) => (
        discussion.discussionName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      ));
      setMyFilteredDiscussions(filtered);
    }

    // search public discussions
    if (!showMyDiscussions) {
      if (!publicDiscussions.length) return;

      const filtered = publicDiscussions.filter((discussion) => (
        discussion.discussionName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      ));
      setFilteredPublicDiscussions(filtered);
    }

    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <Stack
      id="discussions_section"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginBottom="100px"
      sx={{ paddingTop: {xs: "120px", md: "80px"}}}
    >
      <Stack display="flex" justifyContent="center" alignItems="center" marginBottom="30px"
        sx={{ width: {xs: "95%", sm: "60%", md: "50%"}, maxWidth: "600px"}}
      >
        <Box sx={{ display: 'flex', marginBottom: "30px"}}>
          <Typography
            onClick={() => {
              setMyFilteredDiscussions(myDiscussions);
              setShowMyDiscussions(true);
              setSearchTerm("");
            }}
            sx={{
              fontSize: {xs: "16px", md: "25px"},
              textDecoration: showMyDiscussions ? 'underline' : 'none',
              marginRight: {xs: "15px", md: "30px"},
              color: '#382110',
              fontWeight: '300',
              cursor: 'pointer',
            }}
          >
            my discussions
          </Typography>
          <Typography
            onClick={() => {
              setFilteredPublicDiscussions(publicDiscussions);
              setShowMyDiscussions(false);
              setSearchTerm("");
            }}
            sx={{
              fontSize: {xs: "16px", md: "25px"},
              textDecoration: !showMyDiscussions ? 'underline' : 'none',
              color: '#382110',
              fontWeight: '300',
              cursor: 'pointer',
            }}
          >
            public discussions
          </Typography>
        </Box>

        <Stack direction="row" width="100%" sx={{ display: 'flex', alignItems: 'center'}}>
          <Box 
            sx={{ 
              position: 'relative', backgroundColor: 'white', 
              width: {xs: "80%", sm: "50%"},
              padding: {xs: "5px 5px"},
            }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={showMyDiscussions ? "Search your discussions..." : "Search public discussions..."}
              style={{
                position: "relative",
                width: "80%",
                height: '100%',
                fontSize: '16px',
                outline: 'none',
                border: 'none',
              }}
            />

            <img
              src="https://s.gr-assets.com/assets/layout/header/icn_nav_search.svg"
              alt="search"
              height="20px"
              width="20px"
              style={{ 
                position: 'absolute',
                right: 10,
                top: "5px",
              }}
            />
          </Box>
        </Stack>
      </Stack>

      {showMyDiscussions ? (
        <ScrollingContainer>
          {myFilteredDiscussions.length ? (
            myFilteredDiscussions.map((discussion, idx) => (
              <DiscussionItem key={`${discussion._id}-${idx}`} discussion={discussion} />
            ))
          ) : null}

          {!myFilteredDiscussions.length && searchTerm.length ? (
            <Typography width="100%" height="100%" fontSize="20px"
              display="flex" justifyContent="center" alignItems="center"
            >
              No discussions found
            </Typography>
          ) : null}

          {!myDiscussions.length ? (
            <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
              <Typography fontSize="20px">You are not a participant in any discussion</Typography>
              <Typography fontSize="20px">Contribute to a discussion to become a participant</Typography>
            </Box>
          ) : null}
        </ScrollingContainer>
      ) : null}

      {!showMyDiscussions ? (
        <ScrollingContainer>
          {filteredPublicDiscussions.length ? (
            filteredPublicDiscussions.map((discussion, idx) => (
              <DiscussionItem key={`${discussion._id}-${idx}`} discussion={discussion} />
            ))
          ) : null}

          {!filteredPublicDiscussions.length && searchTerm.length ? (
            <Typography width="100%" height="100%" fontSize="20px"
              display="flex" justifyContent="center" alignItems="center"
            >
              No discussions found
            </Typography>
          ) : null}

          {!publicDiscussions.length ? (
            <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
              <Typography fontSize="20px">There are no public discussions</Typography>
              <Typography fontSize="20px">Join a group and contribute to a discussion to become a participant</Typography>
            </Box>
          ) : null}
        </ScrollingContainer>
      ) : null}
    </Stack>
  );
}

export default DiscussionsSection;
