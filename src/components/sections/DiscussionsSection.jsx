import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { DiscussionItem, ScrollingContainer } from '../reusable';
import { fetchMyDiscussions, fetchPublicDiscussions } from '../../utils';

const DiscussionsSection = () => {
  const { user, userDetails } = useGlobalStore();
  const [showMyDiscussions, setShowMyDiscussions] = useState(true);
  const [myDiscussions, setMyDiscussions] = useState([]);
  const [publicDiscussions, setPublicDiscussions] = useState([]);

  const [myFilteredDiscussions, setMyFilteredDiscussions] = useState([]);
  const [filteredPublicDiscussions, setFilteredPublicDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {id} = useParams();

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

  }, [searchTerm]);

  return (
    <Stack
      id="discussions_section"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack width="50%" display="flex" justifyContent="center" alignItems="center" marginBottom="30px">
        <Box sx={{ display: 'flex', marginBottom: "30px"}}>
          <Typography
            onClick={() => {
              setMyFilteredDiscussions(myDiscussions);
              setShowMyDiscussions(true);
              setSearchTerm("");
            }}
            sx={{
              fontSize: 25,
              textDecoration: showMyDiscussions ? 'underline' : 'none',
              margin: '0 20px',
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
              fontSize: 25,
              textDecoration: !showMyDiscussions ? 'underline' : 'none',
              margin: '0 20px',
              color: '#382110',
              fontWeight: '300',
              cursor: 'pointer',
            }}
          >
            public discussions
          </Typography>
        </Box>

        <Stack direction="row" width="100%" sx={{ display: 'flex', alignItems: 'center'}}>
          <Box sx={{ position: 'relative', backgroundColor: 'white', width: "40%"}}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={showMyDiscussions ? "Search your discussions..." : "Search public discussions..."}
              style={{
                position: "relative",
                width: "80%",
                height: '100%',
                padding: "10px 5px",
                fontSize: '18px',
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
                top: "10px",
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
