const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    bookId: ID!
    authors: [String]!
    description: String!
    image: String
    title: String!
  }

  input BookInput {
    bookId: ID
    authors: [String]
    description: String
    image: String
    title: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    books(username: String): [Book]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String], description: String, image: String, title: String): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
