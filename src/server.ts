import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import { schema } from './schema'
import * as dotenv from "dotenv";

dotenv.config();

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: true,
  introspection: true,
})

server.listen().then(({ url }) =>
  console.log(
    `\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api`,
  ),
)
