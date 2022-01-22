const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    welcome: String!
    allAuthors: [Author!]!
    authorById(id: ID!): Author!
    allBooks: [Book!]!
    booksByAuthorId(id: ID!): [Book!]!
    publisherById(id: ID!): Publisher!
    publisherAddressByCompany(company: String!): Address!
    publisherByNumBooks(num: Int!): [Publisher!]!
  }

  type Mutation {
    addAuthor(input: AddAuthorInput!): Author!
    addBook(input: AddBookInput!): Book!
    deleteBook(id: ID!): Book!
    login(email: String!, password: String!): AuthReturn!
    register(input: RegisterInput!): AuthReturn!
  }

  type User {
    id: ID!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type AuthReturn {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  type Publisher {
    id: ID!
    company: String!
    phoneNumber: String!
    numBooksPublished: Int!
    address: Address!
    books: [Book!]!
  }

  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int
    email: String
    numBooksPublished: Int
    address: Address
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    language: String!
    numPages: Int
    datePublished: String
    bestseller: Boolean
    author: Author!
    publisher: Publisher!
  }

  input AddAuthorInput {
    firstName: String!
    lastName: String!
    age: Int
    email: String
    numBooksPublished: Int
  }

  input AddBookInput {
    title: String!
    language: String!
    numPages: Int
    bestseller: Boolean
    authorId: ID!
    publisherId: ID!
  }

`
