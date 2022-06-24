const { gql } = require("apollo-server-core");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    getUsers: [User]
    items(input: ItemsInput): ItemsOutput
    searchedItems(itemName: String!, page: Int, pageSize: Int): ItemsOutput
  }

  type Mutation {
    login(email: String!, password: String!): User
    createUser(input: CreateUserInput): User
    createItem(input: CreateItemInput): Item

    test: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Item {
    id: ID
    costPrice: Float
    itemName: String
    retailPrice: Float
  }

  type ItemsOutput {
    count: Int
    rows: [Item!]!
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input CreateItemInput {
    costPrice: Float
    itemName: String
    retailPrice: Float
  }

  input ItemsInput {
    page: Int
    pageSize: Int
  }
`;

module.exports = typeDefs;
