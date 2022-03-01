# Generate the supergraph

This graph is inspired from [Mandy Wise's][1] tutorial on federation, but using Apollo's managed capabilities.We have the following subgraphs:

```
- films
- people
```

## Serve Gateway to Sandbox (not managed)

To generate the supergraph we need to get the local servers running, and then use `rover supergraph` command. Use this script: `npm run start:subgraphs`. You can kill it after generating the supergraph. 

```
rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql
```

Now that we have a local copy of the supergraph, we can start the gateway with the subgraph services using this command concurrently: `npm run dev`

## Managed Composition

In order to push these to with the rover cli, we need to extract the schemas out of the index files. Each subgraph will manage that separately.

### Registering subgraphs

**People**

```
APOLLO_KEY=service:studio-managed:XXXXXXXXX \
  rover subgraph publish studio-managed@current \
  --routing-url http://localhost:4001/graphql \
  --schema ./schema.graphql \
  --name people
```

**Films**

```
APOLLO_KEY=service:studio-managed:XXXXXXXXX \
  rover subgraph publish studio-managed@current \
  --routing-url http://localhost:4002/graphql \
  --schema ./schema.graphql \
  --name films
```

Sample query from Studio:

```
query ExampleQuery {
  films {
    id
    title
    actors {
      name
    }
  }
}

## Response
{
  "data": {
    "films": [
      {
        "id": "1",
        "title": "Jaws",
        "actors": [
          {
            "name": "Richard Dreyfuss"
          }
        ]
      },
      {
        "id": "2",
        "title": "Close Encounters of the Third Kind",
        "actors": [
          {
            "name": "Richard Dreyfuss"
          }
        ]
      },
      {
        "id": "3",
        "title": "Raiders of the Lost Ark",
        "actors": [
          {
            "name": "Harrison Ford"
          }
        ]
      }
    ]
  }
}
```

See pipeline for bitbucket: https://www.apollographql.com/docs/rover/ci-cd/#bitbucket-pipelines

https://www.apollographql.com/docs/federation/enterprise-guide/change-management/


[1]:https://dev.to/mandiwise/getting-started-with-apollo-federation-and-gateway-4739