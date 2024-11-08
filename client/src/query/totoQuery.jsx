import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GET_TODOS {
    todo {
      id
      todo
      completed
      created_at 
    }
  }
`;
export const CREATE_TODO = gql`
  mutation createTodo($todo: String!) {
    createTodo(todo: $todo) {
      id
      todo
      completed
      created_at
    }
  }
`;

export const UPDATE_COMPLETE = gql`
  mutation UpdateComplete($id: String!, $data: Boolean!) {
    toggleComplete(id: $id, data: $data) {
      message 
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UPDATE_TODO($id: String!, $todo: String!) {
    updateTodo(id: $id, todo: $todo) {
      message 
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DELETE_TODO($id: String!) {
    deleteTodo(id: $id) {
      message 
    }
  }
`;

