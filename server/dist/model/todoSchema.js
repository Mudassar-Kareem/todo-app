const todoSchema = `#graphql

type Todo{
    id: String!
    todo: String
    completed: Boolean
    created_at: Date
}

type Query{
    getTodos: [Todo]
}

`;
