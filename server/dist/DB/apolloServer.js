import { ApolloServer } from "@apollo/server";
import todoSchema from "../model/todo/todoSchema.js";
import todoResolver from "../model/todo/todoResolver.js";
const apolloServer = new ApolloServer({
    typeDefs: todoSchema,
    resolvers: todoResolver
});
export default apolloServer;
