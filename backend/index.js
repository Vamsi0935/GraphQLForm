const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const cors = require("cors");

const app = express();
app.use(cors());

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  mongoose
    .connect(
      "mongodb+srv://dvkrishna142000:GiPqheUeRlTzMAvj@cluster0.citnu.mongodb.net/GraphQLRegistrationForm?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("MongoDB connected successfully....");
    })
    .catch((err) => {
      console.log(err);
    });

  app.listen({ port: 5000 }, () => {
    console.log(
      `Server is running on http://localhost:5000${server.graphqlPath}`
    );
  });
};

startServer();
