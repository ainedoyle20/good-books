export default {
  name: 'datedMessages',
  title: 'Dated Messages',
  type: 'document',
  fields: [
    {
      name: 'messageDate',
      title: 'Message Date',
      type: 'string',
    },
    {
      name: 'texts',
      title: 'Texts',
      type: 'array',
      of: [{ type: 'message' }]
    }
  ]
}