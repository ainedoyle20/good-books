import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useGlobalStore from '../../store/globalStore';
import { fetchPublicGroups } from '../../utils';
import { ScrollingContainer } from '../reusable';
import { CreateGroupModal } from "../modals";
import { GroupItem } from "../list-items";

const GroupsSection = () => {
  const { user, userDetails, publicGroups, updatePublicGroups } = useGlobalStore();

  const [showMyGroups, setShowMyGroups] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(userDetails?.groups ? userDetails.groups : []);
  const [filteredPublicGroups, setFilteredPublicGroups] = useState(publicGroups ? publicGroups : []);

  const [showGroupModal, setShowGroupModal] = useState(false);

  const {id} = useParams();

  useEffect(() => {
    fetchPublicGroups(updatePublicGroups);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (showMyGroups && userDetails?.groups) { // checking if groups exist on userDetails
      setFilteredGroups(userDetails?.groups?.filter((group) => (
        group.groupName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        )
      ));

    } else if (!showMyGroups && publicGroups) { // checking if publicGroups are not null
      setFilteredPublicGroups(publicGroups.filter((group) => (
        group.groupName.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        )
      ));
    }
    

  }, [searchTerm, userDetails, publicGroups, showMyGroups]);

  return (
    <>
      {!showGroupModal ? (
        <Stack
          id="groups_section" width="100vw" height="100vh" display="flex"
          alignItems="center" justifyContent="center" marginBottom="100px"
          sx={{ paddingTop: { xs: "120px", md: "60px"}}}
        >
          
          <Stack
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginBottom: '30px',
              width: {xs: "95%", sm: "60%", md: "50%"},
              maxWidth: "600px",
            }}
          >
            <Box sx={{ display: 'flex', marginBottom: "30px"}}>
              <Typography
                onClick={() => {
                  setShowMyGroups(true);
                  setSearchTerm("");
                  setFilteredGroups(userDetails?.groups ? userDetails?.groups : []);
                }}
                sx={{
                  fontSize: {xs: "16px", md: "25px"},
                  textDecoration: showMyGroups ? 'underline' : 'none',
                  margin: '0 20px',
                  color: '#382110',
                  fontWeight: '300',
                  cursor: 'pointer',
                }}
              >
                my groups
              </Typography>
              <Typography
                onClick={() => {
                  setShowMyGroups(false);
                  setSearchTerm("");
                  setFilteredPublicGroups(publicGroups);
                }}
                sx={{
                  fontSize: {xs: "16px", md: "25px"},
                  textDecoration: !showMyGroups ? 'underline' : 'none',
                  margin: '0 20px',
                  color: '#382110',
                  fontWeight: '300',
                  cursor: 'pointer',
                }}
              >
                public groups
              </Typography>
            </Box>

            <Stack direction="row"
              sx={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: "100%"
              }}
            >
              <Box sx={{ 
                position: 'relative', 
                width: {xs: "60%", md: "40%"}, 
                marginLeft: {xs: "5px", sm: "0"},
                backgroundColor: "white",
                height: "35px",
                paddingLeft: "5px",
              }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={showMyGroups ? "Search your groups..." : "Search public groups..."}
                  style={{
                    position: "relative",
                    width: "80%",
                    height: '100%',
                    outline: 'none',
                    border: 'none',
                    fontSize: "16px"
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
              
              {user._id === id ? (
                <Box paddingRight="25px">
                  <Typography
                    onClick={() => setShowGroupModal(true)}
                    sx={{ fontSize: {xs: "14px", md: "18px"}, cursor: 'pointer' }}
                  >
                    Create Group
                  </Typography>
                </Box>
              ) : null}
            </Stack>
          </Stack>

          {showMyGroups ? (
            <ScrollingContainer>
              {filteredGroups.length 
                ? filteredGroups.map((group) => (
                    <GroupItem 
                      key={group._id}
                      group={group}
                      user={user}
                      showMyGroups={showMyGroups}
                    />
                  )) 
                : null
              }

              {!filteredGroups.length && searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      No Results
                    </Typography>
                  ) 
                : null
              }

              {!filteredGroups.length && !searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      You are not a member of any group <br/>
                      Join an existing group or Create a group
                    </Typography>
                  ) 
                : null
              }

            </ScrollingContainer>

          ) : null}

          {!showMyGroups ? (
            <ScrollingContainer>
              {filteredPublicGroups.length 
                ? filteredPublicGroups.map((group) => (
                    <GroupItem 
                      key={group._id}
                      group={group}
                      user={user}
                      showMyGroups={showMyGroups}
                    />
                  )) 
                : null
              }

              {!filteredPublicGroups.length && searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      No Results
                    </Typography>
                  ) 
                : null
              }

              {!filteredPublicGroups.length && !searchTerm.length
                ? ( <Typography
                      width="100%" height="100%" display="flex" justifyContent="center"
                      alignItems="center" fontSize={20} color="#382110"
                    >
                      There are no Public Groups
                    </Typography>
                  ) 
                : null
              }

            </ScrollingContainer>

          ) : null}

        </Stack>
      ) : null
      }

      {showGroupModal ? (
        <CreateGroupModal 
          user={user}
          userDetails={userDetails}
          setShowGroupModal={setShowGroupModal}
        />
      ) : (
        null
      )}
    </>
  );
}

export default GroupsSection;
