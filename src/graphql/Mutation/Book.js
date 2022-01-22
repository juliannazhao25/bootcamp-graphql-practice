const Book = require('../../models/Book')

const addBook = async (obj, AddBookInput, context) => {
  try {
    console.log('hello')
    const object = Object.values(AddBookInput)[0]
    console.log('got here')
    console.log(object)
    const b = await Book.query().insert({
      title: object.title,
      language: object.language,
      numPages: object.numPages,
      bestseller: object.bestseller,
      authorId: object.authorId,
      publisherId: object.publisherId,
    })
    return b
  } catch (err) {
    console.log(err)
    throw new Error('failed to add book')
  }
}

const deleteBook = async (obj, { id }, context) => {
  const b = await Book.query().delete().findOne('id', id).returning('*')
  return b
}

const resolver = {
  Mutation: {
    addBook,
    deleteBook,
  },
}

module.exports = resolver
