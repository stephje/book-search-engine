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
    bookID: ID!
    authors: [String]!
    description: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User

    books: [Book]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

  }
`;

    // saveBook
    // deleteBook

module.exports = typeDefs;
