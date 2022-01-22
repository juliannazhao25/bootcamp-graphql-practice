const Author = require('../../models/Author')

const addAuthor = async (obj, AddAuthorInput, context) => {
  try {
    const object = Object.values(AddAuthorInput)[0]
    console.log(object)
    const a = await Author.query().insert({
      firstName: object.firstName,
      lastName: object.lastName,
      age: object.age,
      email: object.email,
      numBooksPublished: object.numBooksPublished,
    })
    return a
  } catch (err) {
    throw new Error('failed to add author')
  }
}

const resolver = {
  Mutation: {
    addAuthor,
  },
}

module.exports = resolver
