const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { people } = require("../data.js");

const port = 4001;

const { readFileSync } = require("fs");
const typeDefs = gql(readFileSync(`${__dirname}/schema.graphql`,'UTF-8'));

const resolvers = {
  Person: {
    __resolveReference(object) {
      return people.find((person) => person.id === object.id);
    },
  },
  Query: {
    person(_, { id }) {
      return people.find((person) => person.id === id);
    },
    people() {
      return people;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`People service ready at ${url}`);
});
