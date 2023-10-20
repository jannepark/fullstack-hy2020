const Book = require('./models/book')

const batchAuthorBookCounts = async (authorIds) => {
  const books = await Book.find({})

  const bookCounts = books.reduce((bookCounts, book) => {
    const authorId = book.author

    if (bookCounts[authorId]) {
      bookCounts[authorId] += 1
    } else {
      bookCounts[authorId] = 1
    }

    return bookCounts
  }, {})

  return authorIds.map((authorId) => {
    if (bookCounts[authorId]) {
      return bookCounts[authorId]
    } else {
      return 0
    }
  })
}

module.exports = { batchAuthorBookCounts }
