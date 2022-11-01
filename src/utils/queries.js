export const userDetailsQuery = (id) => {
  const query = `*[_type == "user" && _id == "${id}"]{
    _id,
    image,
    userName,
    readShelf,
    readingShelf,
    wantToReadShelf,
    friends[]->{
      _id,
      userName,
      image
    },
    requestedFriends[]->{
      _id,
      userName,
      image
    },
    friendRequests[]->{
      _id,
      userName,
      image
    },
    groups[]->{
      _id,
      groupName,
      postedBy->{
        _id,
        userName,
        image
      },
      members[]->{
        _id,
        userName,
        image
      },
      discussions[]->{
        _id,
        creator->{
          _id,
          userName,
          image
        },
        discussionName,
        groupName,
        participants[]->{
          _id,
          userName,
          image
        },
        contributions[]->{
          text,
          postedBy->{
            _id,
            userName,
            image,
          }
        }
      },
      public,
    },
    messagedUsers[]{
      _key,
      messageFriend->{
        _id,
        userName,
        image,
      },
      datedMessages[]{
        _key,
        messageDate,
        texts[]{
          postedBy->{
            _id,
            userName,
            image,
          },
          text
        }
      }
    },
    readingChallange,
  }`;

  return query;
}

//103752643371367336491

export const allUsersQuery = () => {
  const query = `*[_type=="user"]{
    _id,
    image,
    userName,
    readShelf,
    readingShelf,
    wantToReadShelf,
    friends,
    groups,
    discussions,
    messages,
    readingChallange,
  }`;
  return query;
}

export const publicGroupsQuery = () => {
  const query = `*[_type=="group" && public==true]{
    _id,
    groupName,
    postedBy->{
      _id,
      userName,
    },
    members[]->{
      _id,
      userName,
      image
    },
  }`;

  return query;
}

export const allGroupsQuery = () => {
  const query = `*[_type=="group"]{
    _id,
    groupName,
    postedBy->{
      _id,
      userName,
    },
    members[]->{
      _id,
      userName,
      image
    },
  }`;

  return query;
}

export const myGroupsQuery = (groupIdArray) => {
  const query = `*[_type=="group" && _id in [${groupIdArray}]]{
    _id,
    groupName,
    postedBy->{
      _id,
      userName,
      image
    },
    members[]->{
      _id,
      userName,
      image
    },
  }`;

  return query;
}

export const specificGroupQuery = (groupId) => {
  const query = `*[_type=="group" && _id=="${groupId}"]{
    _id,
    groupName,
    discussions[]->{
      _id,
      discussionName,
      groupName,
      creator->{
        _id, 
        userName,
        image
      },
      participants[]->{
        _id,
        userName,
        image
      },
      contributions[]{
        text,
        postedBy->{
          _id, 
          userName,
          image
        }
      }
    },
    members[]->{
      _id,
      userName,
      image
    },
    postedBy->{
      _id, 
      userName,
      image
    },
    public,
  }`;

  return query;
}

export const specificDiscussionQuery = (discussionId) => {
  const query = `*[_type=="discussion" && _id=="${discussionId}"]{
    _id,
    discussionName,
    groupId,
    groupName,
    creator->{
      _id,
      userName,
      image
    },
    participants[]->{
      _id,
      userName,
      image
    },
    contributions[]{
      _key,
      messageDate,
      texts[]{
        _key,
        text,
        postedBy->{
          _id,
          userName,
        }
      }
    }
  }`;

  return query;
}
