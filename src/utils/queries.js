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
        creatorId,
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
    },
    messages[]{
      _key,
      messageFriend->{
        _id,
        userName,
        image,
      },
      textMessages[]{
        _key,
        postedBy->{
          _id,
          userName,
          image,
        },
        text
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
