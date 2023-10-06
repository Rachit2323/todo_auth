import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [editedText, setEditedText] = useState(""); // New state for edited text
  const [editingTodoId, setEditingTodoId] = useState(""); // New state for tracking editing todo

  useEffect(() => {
    // Fetch todos from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/todo", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTodos(data.todos); // Set the todos array from the response
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateTodo = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTodos([...todos, data]); // Add the new todo to the list
      setNewTodo("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditTodo = async (todoId, newText) => {
    try {
      const response = await fetch(`http://localhost:4000/api/todo/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newText }), // Update the title, not "text"
      });

      if (!response.ok) {
        throw Error("Network response was not ok");
      }

      const updatedTodos = todos.map((todo) =>
        todo._id === todoId ? { ...todo, title: newText } : todo
      );

      setTodos(updatedTodos);
      setEditingTodoId(""); 
      setEditedText("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/todo/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
       
      // For each todo object in the array, the code checks if the _id of the todo is not equal to the todoId that you want to delete.
      const updatedTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Filter todos based on the searchQuery
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          placeholder="Search Todo"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleCreateTodo}>Add</button>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <div key={todo._id}>
            {editingTodoId === todo._id ? (
              <div>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => handleEditTodo(todo._id, editedText)}>
                  Save
                </button>
              </div>
            ) : (
              <span>{todo.title}</span>
            )}
            <button onClick={() => setEditingTodoId(todo._id)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
