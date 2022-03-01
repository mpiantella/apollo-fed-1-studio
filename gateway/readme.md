# Gateway


## Single graph

Option 1: Use a local file containing the schema (e.g., called schema.graphql)

```
APOLLO_KEY=service:studio-managed:XXXXXXXXXX \
  rover graph publish studio-managed@current \
  --schema ./schema.graphql
```

Option 2: Introspect a running server (e.g., at http://localhost:4000)

```
rover graph introspect \
  http://localhost:4000 | \
  APOLLO_KEY=service:studio-managed:XXXXXXXXXX \
  rover graph publish studio-managed@current --schema -
```

## Federation

Pick this option to set up a graph that uses Apollo Federation. As you register each subgraph, Apollo will attempt to compose all your subgraphs into a single supergraph schema. Whenever supergraph schema build succeeds, your gateway can fetch the latest federated schema from the registry.

Rover is our command-line tool for interacting with the schema registry. Install Rover and choose an option below to start your first publish. Set up your CI/CD pipeline to automatically keep your schema current in Studio going forward!

Option 1: Use a local file containing the subgraph schema (e.g., called products-schema.graphql)

```
APOLLO_KEY=service:studio-managed:XXXXXXXX \
  rover subgraph publish studio-managed@current \
  --name products --schema ./products-schema.graphql \
  --routing-url http://products.prod.svc.cluster.local:4001/graphql
```
Option 2: Introspect a running subgraph (e.g., at http://localhost:4001)

```
rover subgraph introspect \
  http://localhost:4001 | \
  APOLLO_KEY=service:studio-managed:XXXXXXXX \
  rover subgraph publish studio-managed@current \
  --name products --schema - \
  --routing-url http://products.svc.cluster.local:4001/graphql
```