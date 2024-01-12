const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT;
const uri = process.env.URI;

const typeDefs = require('./graphql/typeDefs');
const movieResolver = require('./graphql/movieResolver');
const genresResolver = require('./graphql/genresResolver');
const userResolver = require('./graphql/userResolver');
const commentResolver = require('./graphql/commentResolver');

const { mergeResolvers } = require('@graphql-tools/merge');

const mergedResolvers = mergeResolvers([movieResolver, genresResolver, userResolver, commentResolver]);

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  playground: true,
});

const connection = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Succeeded connection');
    await server.listen({ port });
    console.log('Listening on port: ' + port);
  } catch (error) {
    console.error(error);
  }
};

connection();
