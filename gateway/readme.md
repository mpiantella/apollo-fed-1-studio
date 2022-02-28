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

### People

```
```

### Films

```
```


[1]:https://dev.to/mandiwise/getting-started-with-apollo-federation-and-gateway-4739