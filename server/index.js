const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./schema");
const User = require("./resolvers/User");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const session = require("express-session");
var cors = require("cors");

// Provide resolver functions for your schema fields
const resolvers = {
  Query,
  Mutation,
  User,
};

(async () => {
  const app = express();

  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      // cookie: {
      //   secure: false,
      //   // secure: process.env.NODE_ENV === "production",
      //   httpOnly: true,
      //   maxAge: 1000 * 60 * 30,
      //   sameSite: "none",
      //   // sameSite: true,
      // },
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 12, //2 weeks
        httpOnly: true,
        sameSite: false, // sets cookie from frontend localhost:3000
        secure: false, // sets cookie from frontend localhost:3000
      },
    })
  );
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      //origin: "http://localhost:3000",
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
