const Author = require('../../models/Author')
const Book = require('../../models/Book')

const allAuthors = async () => {
  try {
    const authors = await Author.query()
    return authors
  } catch (err) {
    throw new Error('failed to get authors')
  }
}

const authorById = async (obj, { id }, context) => {
  const a = await Author.query().findOne('id', id)
  return a
}

const books = async ({ id }, params, context) => {
  const b = await Book.query().where('authorId', id)
  return b
}

const booksByAuthorId = async (obj, { id }, context) => {
  const b = await Book.query().where('authorId', id)
  return b
}

const resolver = {
  Query: {
    allAuthors,
    authorById,
    booksByAuthorId,
  },
  Author: {
    books,
  },
}

module.exports = resolver
