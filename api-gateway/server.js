const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServer } = require('@apollo/server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const bodyParser = require('body-parser');
const cors = require('cors');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  const server = new ApolloServer({ schema });
  await server.start();

  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`🚀 API Gateway listening on http://localhost:${PORT}/graphql`);
  });
}

startServer();
