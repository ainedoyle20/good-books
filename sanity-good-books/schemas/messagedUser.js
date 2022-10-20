export default {
  name: 'messagedUser',
  title: 'Messaged User',
  type: 'document',
  fields: [
    {
      name: 'textMessages',
      title: 'Text Messages',
      type: 'array',
      of: [{ type: 'datedMessages'}]
    },
    {
      name: 'messageFriend',
      title: 'Message Friend',
      type: 'reference',
      to: [{ type: 'user' }]
    }
  ]
}
