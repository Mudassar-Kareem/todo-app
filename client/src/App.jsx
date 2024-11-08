import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TODOS, CREATE_TODO, UPDATE_COMPLETE, UPDATE_TODO, DELETE_TODO } from "./query/totoQuery";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"; // Ensure you have Heroicons installed

const App = () => {
  const { data, error, loading } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateComplete] = useMutation(UPDATE_COMPLETE, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [todo, setTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTodo({
      variables: { todo },
    });
    setTodo(""); // Clear input after submit
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      // Toggle the completion status of the todo item
      await updateComplete({
        variables: { id, data: !currentStatus },
      });
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleUpdateTodo = async (id, newTodoText) => {
    try {
      await updateTodo({
        variables: { id, todo: newTodoText },
      });
      setEditingTodoId(null); // Stop editing after update
    } catch (err) {
      console.error("Error updating todo text:", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo({
        variables: { id },
      });
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleStartEditing = (id, currentText) => {
    setEditingTodoId(id); // Set the todo as the currently editing one
    setEditedTodoText(currentText); // Pre-fill the input with the current text
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full px-4 h-[70vh] overflow-y-auto md:w-[600px] rounded-lg bg-white shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
          What are you doing today?
        </h1>

        <form onSubmit={handleSubmit} className="mb-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter your todo here..."
            className="w-full outline-none border border-gray-300 rounded-md h-12 p-3 text-gray-700"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </form>

        {loading && <p className="text-center text-gray-500">Loading todos...</p>}
        {error && <p className="text-center text-red-500">Error loading todos.</p>}

        {!loading && !error && data && (
          <ul className="space-y-3 mt-4">
            {data.todo.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-blue-100 rounded-md p-3 shadow-sm"
              >
                <div className="flex w-full items-center justify-between">
                  {editingTodoId === item.id ? (
                    <input
                      type="text"
                      value={editedTodoText}
                      onChange={(e) => setEditedTodoText(e.target.value)}
                      onBlur={() => handleUpdateTodo(item.id, editedTodoText)} // Save changes when input loses focus
                      className={`text-lg ${item.completed ? "line-through text-gray-500" : "text-black"} bg-transparent border-none outline-none w-full`}
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`text-lg ${item.completed ? "line-through text-gray-500" : "text-black"}`}
                    >
                      {item.todo}
                    </span>
                  )}

                  <div className="flex items-center space-x-4 ml-4">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleComplete(item.id, item.completed)}
                      className="cursor-pointer"
                    />
                    <PencilIcon
                      className="h-5 w-5 text-blue-500 cursor-pointer"
                      onClick={() => handleStartEditing(item.id, item.todo)} // Enable editing mode
                    />
                    <TrashIcon
                      className="h-5 w-5 text-red-500 cursor-pointer"
                      onClick={() => handleDeleteTodo(item.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
