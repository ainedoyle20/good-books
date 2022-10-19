export default {
  name: 'messagedUser',
  title: 'Messaged User',
  type: 'document',
  fields: [
    {
      name: 'textMessages',
      title: 'Text Messages',
      type: 'array',
      of: [{ type: 'message'}]
    },
    {
      name: 'messageFriend',
      title: 'Message Friend',
      type: 'savedFriends',
    }
  ]
}
