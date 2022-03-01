const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

// We can build the supergraph and pass it to the gateway for unmangged graphs.
/*
const { readFileSync } = require('fs');
const supergraphSdl = readFileSync('./supergraph.graphql').toString();
const gateway = new ApolloGateway({
  supergraphSdl
});
*/

// Other set up the APOLLO_KEY in .env
require('dotenv').config()

const gateway = new ApolloGateway();

const server = new ApolloServer({
  gateway,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});
