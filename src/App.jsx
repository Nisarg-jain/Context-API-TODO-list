import React, { useState } from 'react';
import { TODOProvider, useTODO } from './contexts/TODOContexts'; // Adjust path based on your index.js location

function TodoDashboard() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodocompleted } = useTODO();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    addTodo(newTodoTitle);
    setNewTodoTitle("");
  };

  const handleEditStart = (id, currentTitle) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const handleEditSave = (id) => {
    if (!editText.trim()) return;
    updateTodo(id, editText);
    setEditingId(null);
  };

  return (
    <div className="bg-[#172842] min-h-screen py-8 font-sans text-white flex justify-center items-start">
      <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl p-6 bg-[#1e3250] border border-gray-700/60 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-400 tracking-wide">
          Context API Task Manager
        </h1>

        {/* Input Form */}
        <form onSubmit={handleAddSubmit} className="flex rounded-xl overflow-hidden shadow-md mb-6">
          <input
            type="text"
            placeholder="Write a new task..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="w-full bg-gray-800/60 px-4 py-3 outline-none text-white border border-gray-700 focus:border-blue-500 transition-all"
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shrink-0 transition duration-150"
          >
            Add
          </button>
        </form>

        {/* Todo List Area */}
        <div className="flex flex-col gap-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center border border-gray-700/40 rounded-xl px-4 py-3 gap-x-3 shadow-sm transition-all duration-200 ${
                todo.completed ? "bg-[#c6e9a7]/10 text-gray-400" : "bg-gray-800/40"
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodocompleted(todo.id)}
                className="cursor-pointer w-5 h-5 accent-blue-500 shrink-0"
              />

              {/* Todo Title Input (Handles dynamic editing) */}
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="bg-gray-900/80 outline-none w-full text-lg rounded-lg px-2 py-0.5 border border-gray-600 text-white"
                  autoFocus
                />
              ) : (
                <span className={`w-full text-lg px-2 break-words ${todo.completed ? "line-through opacity-50" : ""}`}>
                  {todo.title}
                </span>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-x-2 shrink-0">
                {editingId === todo.id ? (
                  <button
                    onClick={() => handleEditSave(todo.id)}
                    className="p-1.5 rounded-lg border border-green-700 hover:bg-green-600/20 text-green-400 transition"
                  >
                    📁
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditStart(todo.id, todo.title)}
                    disabled={todo.completed}
                    className={`p-1.5 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition ${
                      todo.completed ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                  >
                    ✏️
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1.5 rounded-lg border border-red-900/50 hover:bg-red-500/20 text-red-400 transition"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-4">All cleared! Take a break. 🌟</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrap the Content inside the Provider
export default function App() {
  return (
    <TODOProvider>
      <TodoDashboard />
    </TODOProvider>
  );
}