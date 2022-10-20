import jwt_decode from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';

import { client } from './client';
import { userDetailsQuery, allUsersQuery, publicGroupsQuery, allGroupsQuery, myGroupsQuery } from './queries';

export const createOrGetUser = async (googleRes, addUserFunc, removeUserFunc) => {
  const decoded = jwt_decode(googleRes.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }

  addUserFunc(user);

  // add user to sanity
  try {
    await client.createIfNotExists(user);
    console.log("success logging in");
  } catch (error) {
    console.log("Error logging in");
    removeUserFunc();
  }
  
}

export const fetchAllUsers = async (setAllUsers) => {
  const query = allUsersQuery();

  try {
    const allMembers = await client.fetch(query);
    setAllUsers(allMembers);
  } catch (error) {
    console.log("error getting all users: ", error);
  }
}

export const fetchUserDetails = async (id, setUserDetails) => {
  const query = userDetailsQuery(id);

  try {
    const data = await client.fetch(query);
    setUserDetails(data[0]);
    return data[0];
  } catch (error) {
    console.log("error fetching user details: ", error);
  }
}

export const updateUserImage = async (imageUrl, id) => {
  try {
    await client.patch(id).set({ image: imageUrl }).commit();
    console.log('successfully updated user image');
  } catch (error) {
    console.log("error updating user image: ", error);
  }
}

export const incrementReadingChallange = async (id) => {
  try {
    await client.patch(id).setIfMissing({ readingChallange: 0 }).inc({ readingChallange: 1 }).commit();
    console.log('successfully incremented readingChallange');
    return true;
  } catch (error) {
    console.log('error incrementing readingChallange')
  }
}

export const decrementReadingChallange = async (id) => {
  try {
    await client.patch(id).dec({ readingChallange: 1 }).commit();
    console.log('successfully decremented readingChallange');
    return true;
  } catch (error) {
    console.log('error decrementing readingChallange')
  }
}

export const befriendMember = async (userId, memberId) => {
  console.log("userId: ", userId);
  console.log("memberId: ", memberId);
  try {
    await client.patch(userId).setIfMissing({ friends: [] }).insert("after", "friends[-1]", [{ 
      _key: uuidv4(),
      _type: 'user',
      _ref: memberId 
    }])
    .commit();
    return true;
  } catch (error) {
    console.log('Error befriending user: ', error);
  }
}

export const unfriendMember = async (userId, friendId) => {
  console.log("friendId: ", friendId);
  try {
    await client.patch(userId).unset([`friends[_ref=="${friendId}"]`]).commit();
    return true;
  } catch (error) {
    console.log("Error unfriending memeber: ", error);
  }
}

export const createGroup = async (userId, groupName, groupMembers, isPublic) => {
  const members = groupMembers.map((memberId) => (
    {
      _key: uuidv4(),
      _type: 'reference',
      _ref: `${memberId}`
    }
  ));

  console.log("members: ", members);

  const groupDoc = {
    _type: 'group',
    groupName,
    members,
    postedBy: {
      _type: 'postedBy',
      _ref: `${userId}`
    },
    public: isPublic,
  }

  try {
    const {_id} = await client.create(groupDoc);

    await Promise.all(groupMembers.map(async (memberId, idx) => {
      if (idx === groupMembers.length-1) console.log('got here: ', idx);
      await client.patch(memberId)
        .setIfMissing({ groups: [] }).insert("after", "groups[-1]", [{
          _key: uuidv4(),
          _ref: _id,
          _type: 'reference',
        }])
        .commit()
    }));

    // await client.patch(groupMembers).setIfMissing({ groups: [] }).insert("after", "groups[-1]", [_id]).commit();

    return true;
    
  } catch (error) {
    console.log("Error creating group: ", error);
  }
}

export const fetchPublicGroups = async (setPublicGroups) => {
  const query = publicGroupsQuery();

  try {
    const publicGroups = await client.fetch(query);
    setPublicGroups(publicGroups);
  } catch (error) {
    console.log('Error fetching public groups: ', error);
  }
}

export const fetchAllGroups = async (setAllGroups) => {
  const query = allGroupsQuery();

  try {
    const allGroups = await client.fetch(query);
    // console.log("allGroups: ", allGroups);
    setAllGroups(allGroups);
  } catch (error) {
    console.log('Error fetching all groups: ', error);
  }
}

export const fetchMyGroups = async (idArray) => {
  const queryArray = idArray.map((groupId) => `"${groupId}"`);
  // console.log("queryArray: ", queryArray);
  const query = myGroupsQuery(queryArray);

  try {
    const myGroups = await client.fetch(query);
    // console.log("myGroups: ", myGroups);
    return myGroups;
  } catch (error) {
    console.log('Error fetching your groups: ', error);
  }
}

export const deleteGroups = async (selectedGroupsArray) => {
  try {
    await Promise.all(selectedGroupsArray.map(async (group, idx) => {
      console.log(`group-${idx}: `, group);
      await Promise.all(group.members.map(async (member, index) => {
        console.log(`member-${index}: `, member);
        await client.patch(member._id).unset([`groups[_ref=="${group._id}"]`]).commit();
      }))

      await client.delete(group._id);
    }))

    return true;
  } catch (error) {
    console.log('Error deleting groups: ', error);
  }


  // const queryGroup = groupIdArray.map((groupId) => `"${groupId}"`);
  // // console.log(queryGroup);
  // // console.log(`*[_type=="group" && _id in [${queryGroup}]]`);
  // try {
  //   await client.delete({ query: `*[_type=="group" && _id in [${queryGroup}]][0..${queryGroup.length}]`});
  //   console.log('Success deleting groups');
  //   return true;
  // } catch (error) {
  //   console.log('Error deleting groups: ', error);
  // }
}

export const createMessageObject = async (userId, friendId) => {
  const ids = [`${userId}`, `${friendId}`];
  const uniqueKey = uuidv4();
  const datedMessagesKey = uuidv4();
  // const messageObj = {
  //   _key: uuidv4(),
  //   _type: 'messagedUser',
  //   messageFriend: {
  //     _ref: friendId,
  //     _type: 'savedFriends',
  //   },
  //   textMessages: [],
  // }

  try {
    const data = await Promise.all(ids.map(async (id, idx) => (
      await client.patch(id)
        .setIfMissing({ messages: []})
        .insert("after", "messages[-1]", [{
          _key: uniqueKey,
          _type: 'messagedUser',
          messageFriend: {
            _ref: idx === 0 ? ids[1] : ids[0],
            _type: 'reference',
          },
          textMessages: [
            {
              _type: 'datedMessages',
              _key: datedMessagesKey,
              messageDate: new Date().toString(),
              messages: [],
            }
          ],
        }])
        .commit()
    )));

    const messageKey = data[0]?.messages?.filter((obj) => obj._key === uniqueKey);
    console.log("messageKey: ", messageKey[0]?._key);
    return messageKey[0]?._key;
  } catch (error) {
    console.log("Error creating messageObject: ", error);
  }
}