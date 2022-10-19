export default {
  name: 'group',
  title: 'Group',
  type: 'document',
  fields: [
    {
      name: 'groupName',
      title: 'Group Name',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Creator',
      type: 'postedBy',
    },
    {
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{ type: 'savedFriends' }],
    },
    {
      name: 'removedMembers',
      title: 'Removed Members',
      type: 'array',
      of: [{ type: 'savedFriends'}],
    },
    {
      name: 'discussions',
      title: 'Discussions',
      type: 'array',
      of: [{ type: 'savedDiscussions' }],
    },
    {
      name: 'public',
      title: 'Public',
      type: 'boolean',
    }
  ]
}