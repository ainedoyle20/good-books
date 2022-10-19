// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import user from './user';
import bookDetails from './bookDetails';
import postedBy from './postedBy';
import group from './group';
import discussion from './discussion';
import message from './message';
import savedFriends from './savedFriends';
import savedGroups from './savedGroups';
import savedDiscussions from './savedDiscussions';
import savedBook from './savedBook';
import messagedUser from './messagedUser';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    user,
    bookDetails,
    postedBy,
    group,
    discussion,
    message,
    savedFriends,
    savedGroups,
    savedDiscussions,
    savedBook,
    messagedUser,
  ]),
})
