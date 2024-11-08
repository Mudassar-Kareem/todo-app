const todoSchema = `#graphql
scalar Date

type ResponseType {
    message: String
}

type Todo {
    id: String!
    todo: String
    completed: Boolean
    created_at: Date
}

type Query {
    todo: [Todo]
}

type Mutation {
    createTodo(todo: String): Todo
    updateTodo(id: String, todo: String): ResponseType
    toggleComplete(id: String, data: Boolean): ResponseType
    deleteTodo(id: String): ResponseType
}
`;

export default todoSchema;
