const { gql } = require("apollo-server-core");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    getUsers: [User]
    items(input: ItemsInput): ItemsOutput
    searchedItems(itemName: String!, page: Int, pageSize: Int): ItemsOutput
    salesOrders(input: SalesOrderInput): SalesOrderOutput
    searchedSalesOrder(
      searchText: String
      page: Int
      pageSize: Int
    ): SalesOrderOutput
  }

  type Mutation {
    login(email: String!, password: String!): User
    createUser(input: CreateUserInput): User
    createItem(input: CreateItemInput): Item
    createSalesOrder(input: CreateSalesOrderInput!): SalesOrder
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

  type SalesOrder {
    id: ID
    date: String
    customerName: String
    orderedItem: String
    quantity: Int
  }

  type SalesOrderOutput {
    count: Int
    rows: [SalesOrder!]!
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
  input SalesOrderInput {
    page: Int
    pageSize: Int
  }

  input CreateSalesOrderInput {
    date: String
    customerName: String
    orderedItem: String
    quantity: Int
  }
`;

module.exports = typeDefs;
