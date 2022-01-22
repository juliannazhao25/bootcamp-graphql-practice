const Publisher = require('../../models/Publisher')
const Book = require('../../models/Book')
const Address = require('../../models/Address')

const publisherById = async (obj, { id }, context) => {
  const p = await Publisher.query().findOne('id', id)
  return p
}

const books = async ({ id }, params, context) => {
  const b = await Book.query().where('publisherId', id)
  return b
}

const address = async ({ addressId }, params, context) => {
  const a = await Address.query().findOne('id', addressId)
  return a
}

const publisherAddressByCompany = async (obj, { company }, context) => {
  const addressId = await Publisher.query().findOne('company', company).select('addressId')
  const a = await Address.query().findOne('id', addressId['addressId'])
  return a
}

const publisherByNumBooks = async (obj, { num }, context) => {
  const p = await Publisher.query().where('numBooksPublished', num)
  return p
}

const resolver = {
  Query: {
    publisherById,
    publisherAddressByCompany,
    publisherByNumBooks,
  },
  Publisher: {
    books,
    address,
  },
}

module.exports = resolver
