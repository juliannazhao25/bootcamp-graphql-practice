const Book = require('../../models/Book')
const Author = require('../../models/Author')

const allBooks = async () => {
  try {
    console.log('hello')
    const books = await Book.query()
    return books 
  } catch (err) {
    throw new Error('failed to get books')
  }
}

const resolver = {
  Query: {
    allBooks,
  },
}

module.exports = resolver
