import React, {useRef, useState, useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { DiscussionItem } from '../reusable';

const DiscussionsSection = () => {
  const { user, userDetails, publicGroups } = useGlobalStore();

  const [showMyDiscussions, setShowMyDiscussions] = useState(true);
  const [filteredDiscussions, setFilteredDiscussions] = useState(userDetails?.groups?.discussions || []);
  const [filteredPublicDiscussions, setFilteredPublicDiscussions] = useState(publicGroups?.discussions || []);
  const [searchTerm, setSearchTerm] = useState("");

  const {id} = useParams();
  const ref = useRef();

  useEffect(() => {
    if (showMyDiscussions && userDetails?.groups?.discussions) {
      setFilteredDiscussions(
        userDetails?.groups?.discussions?.filter((discussion) => (
          discussion.discussionName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        ))
      );
    } else {
      setFilteredPublicDiscussions(
        publicGroups?.discussions?.filter((discussion) => (
          discussion.discussionName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        ))
      )
    }
    
  }, [searchTerm])

  const scroll = (scrollOffset) => {
    ref.current.scrollTop += scrollOffset;
  };

  return (
    <Stack
      id="discussions_section"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack width="50%" 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '30px'
        }}
      >
        <Box sx={{ display: 'flex', marginBottom: "30px"}}>
          <Typography
            onClick={() => {
              setShowMyDiscussions(true);
              setSearchTerm("");
              setFilteredDiscussions(userDetails?.groups?.discussions || []);
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
              setShowMyDiscussions(false);
              setSearchTerm("");
              setFilteredPublicDiscussions(publicGroups?.discussions || []);
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

      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginBottom: 2}}
        onClick={() => scroll(-390)}
      >
        <BsChevronBarUp />
      </Box>

      <Stack
        ref={ref}
        sx={{
          borderRight: '1px solid #382110',
          borderLeft: '1px solid #382110',
          padding: '15px 0',
          width: '50%',
          height: '400px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar':{
            width:0,
          }
        }}
        
      >
        {showMyDiscussions ? 
          filteredDiscussions?.length ?
            filteredDiscussions.map((discussion) => (
              <DiscussionItem 
                key={discussion._id}
                discussion={discussion}
              />
            )) 
          : userDetails?.groups?.discussions && userDetails?.groups?.discussions?.length ? (
              <Typography
                width="100%"
                height="100%"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 20,
                  color: '#382110'
                }}
              >
                No discussions matching &#8220;{searchTerm}&#8221; were found
              </Typography> 
            ) : (
              <Stack
                width="100%"
                height="100%"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                sx={{
                  fontSize: 20,
                  color: '#382110'
                }}
                >
                  No Discussions 
                </Typography>
                {user?._id === id && (
                  <Typography
                    sx={{
                      fontSize: 20,
                      color: '#382110'
                    }}
                  >
                    Join a group to participate in a discussion
                  </Typography>
                )}
              </Stack>
            )      
          : null   
        }

        {!showMyDiscussions ? (
          filteredPublicDiscussions.length ? (
            filteredPublicDiscussions.map((discussion) => (
              <DiscussionItem 
                key={discussion._id}
                discussion={discussion}
              />
            ))
          ) :  (
            <Typography
              width="100%"
              height="100%"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 20,
                color: '#382110'
              }}
            >No Results</Typography> 
          ) 
          ) : null
        }
      </Stack> 
      
      
      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginTop: 2}}
        onClick={() => scroll(390)}
      >
        <BsChevronBarDown />
      </Box>
    </Stack>
  );
}

export default DiscussionsSection;
