const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    birthDate: Date!
    gender: String!
    addressLine1: String!
    addressLine2: String!
    city: String!
    state: String!
    postalCode: String!
    email: String!
    mobileNumber: String!
    comments: String!
    createdAt: Date!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    birthDate: Date! 
    gender: String!
    addressLine1: String!
    addressLine2: String!
    city: String!
    state: String!
    postalCode: String!
    email: String!
    mobileNumber: String!
    comments: String!
  }

  type Query {
    users: [User!]!
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(userInput: UserInput): User!
  }
`;

module.exports = typeDefs;
