import React, {useState, useEffect, useRef} from 'react';
import { Box, Stack, Typography, Switch } from '@mui/material';
import { BsChevronBarUp, BsChevronBarDown, BsCheck2 } from 'react-icons/bs';

import { createGroup } from '../../../utils';

const CreateGroupModal = ({ user, userDetails, setShowGroupModal }) => {
  const [inputGroupName, setInputGroupName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([user?._id]);
  const [filteredFriends, setFilteredFriends] = useState(userDetails?.friends ? userDetails.friends : []);
  const [searchFriends, setSearchFriends] = useState("");

  const ref = useRef();

  useEffect(() => {
    if (userDetails?.friends && userDetails?.friends.length) {
      setFilteredFriends(userDetails.friends.filter((friend) => friend.userName.toLowerCase().trim().includes(searchFriends.toLowerCase().trim())));
    }
    // eslint-disable-next-line
  }, [searchFriends])

  const scroll = (scrollOffset) => {
    ref.current.scrollTop += scrollOffset;
  };

  const handleCreateGroup = async () => {
    const success = await createGroup(user._id, inputGroupName, selectedFriends, isPublic);
    if (success) {
      setShowGroupModal(false);
      window.location.reload(true);
    }
  }

  const updateIsPublic = (e) => {
    setIsPublic(e.target.checked);
  }

  return (
    <Stack
      id="groups_section"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{ display: 'flex'}}>
        <Typography
          sx={{
            fontSize: "20px",
            color: '#382110'
          }}
        >Group Name:</Typography>
        <input
          type="text"
          value={inputGroupName}
          onChange={(e) => setInputGroupName(e.target.value)}
          required
          style={{
            marginLeft: 12,
            border: '1px solid #F4F1EA',
            outline: 'none',
            padding: '5px 10px',
            fontSize: '18px'
          }}
        />
      </Box>

      <Box 
        sx={{
          marginTop: '15px',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Switch 
          checked={isPublic}
          onChange={updateIsPublic}
        />
        <Typography
          sx={{
            fontSize: "18px",
            color: '#382110'
          }}
        >
          {isPublic ? "Public" : "Private"}
        </Typography>
      </Box>
      
      <Typography 
        sx={{
          marginTop: '30px',
          marginBottom: '5px',
          fontSize: '20px',
          color: '#382110'
        }}
      >
        Select at least 2 friends to add to your new group
      </Typography>

      <Box>
        <input
          type="text"
          value={searchFriends}
          onChange={(e) => setSearchFriends(e.target.value)}
          placeholder="Search friends..."
          style={{
            border: '1px solid #F4F1EA',
            outline: 'none',
            padding: '5px 10px',
            fontSize: '18px',
            marginBottom: '15px'
          }}
        />
      </Box>

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
      {
        filteredFriends.length ?
          filteredFriends.map((friend) => (
            <Box
              key={friend?._id}
              style={{
                display: "flex",
                alignItems: 'center',
                padding: "10px",
                margin: '15px 0',
                borderTop: '1px solid #382110',
                borderBottom: '1px solid #382110'
              }}
            >
              <img 
                alt="user profile"
                src={friend.image}
                height="40px"
                width="40px"
                style={{ borderRadius: "100%", margin: '0 15px 0 10px'}}
              />

              <Box component="span" sx={{ fontSize: 20, width: '300px', cursor: 'default' }}
              >
                {friend?.userName}
              </Box>

              <Box sx={{ width: '90%', display: 'flex', justifyContent: 'flex-end', paddingRight: '15px'}}>
                <Box
                  onClick={() => {
                    if (selectedFriends.includes(`${friend._id}`)) {
                      const newSelectedFriends = selectedFriends.filter((selectedId) => selectedId !== friend._id);
                      setSelectedFriends([ ...newSelectedFriends ]);
                    } else {
                      setSelectedFriends([ ...selectedFriends, `${friend._id}`])
                    }
                  }}
                  sx={{ 
                    width: '20px',
                    height: '20px',
                    border: '1px solid black',
                    cursor: 'pointer'
                  }}
                >
                  {selectedFriends.includes(friend?._id) ? <BsCheck2/> : null}
                </Box>
              </Box>
            </Box>
          )) 
        : userDetails?.friends && userDetails?.friends?.length ? (
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
              No friends matching &#8220;{searchFriends}&#8221;
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
                You have no friends 
              </Typography>
              <Typography
                sx={{
                fontSize: 20,
                color: '#382110'
                }}
              >
                You must add at least 2 friends to create a group
              </Typography>
            </Stack>
          )      
      }
      </Stack>

      <Box component="span" fontSize={40} sx={{ cursor: 'pointer', marginTop: 2}}
        onClick={() => scroll(390)}
      >
        <BsChevronBarDown />
      </Box>

      <Typography
        onClick={handleCreateGroup}
        sx={{
          fontSize: '22px',
          display: (inputGroupName.length && selectedFriends.length >= 3) ? 'block' : 'none',
          backgroundColor: '#F4F1EA',
          borderRadius: '20%',
          padding: '10px 15px',
          marginTop: '20px',
          cursor: 'pointer'
        }}
      >
        Create
      </Typography>
    </Stack>
  )
}

export default CreateGroupModal;
