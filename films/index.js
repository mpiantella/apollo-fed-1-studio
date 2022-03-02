const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { films } = require("../data.js");

const port = 4002;

const { readFileSync } = require("fs");
const typeDefs = gql(readFileSync(`${__dirname}/schema.graphql`,'UTF-8'));

const resolvers = {
  Film: {
    actors(film) {
      return film.actors.map((actor) => ({ __typename: "Person", id: actor }));
    },
    director(film) {
      return { __typename: "Person", id: film.director };
    },
  },
  Person: {
    appearedIn(person) {
      return films.filter((film) =>
        film.actors.find((actor) => actor === person.id)
      );
    },
    directed(person) {
      return films.filter((film) => film.director === person.id);
    },
  },
  Query: {
    film(_, { id }) {
      return films.find((film) => film.id === id);
    },
    films() {
      return films;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Films service ready at ${url}`);
});
