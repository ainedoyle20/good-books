export default {
  name: 'bookDetails',
  title: 'Book Details',
  type: 'document',
  fields: [
    {
      name: 'bookId',
      title: 'Book Id',
      type: 'number',
    },
    {
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
    },
    {
      name: 'bookCover',
      title: 'Book Cover',
      type: 'string',
    },
    {
      name: 'bookAuthors',
      title: 'Book Authors',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bookRating',
      title: 'Book Rating',
      type: 'number',
    }
  ]
}