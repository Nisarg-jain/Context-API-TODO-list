import { createContext, useState } from "react";



export const TODOContext = createContext({
    todos: [
        { id : 1, title: "Learn React", completed: false },
        { id : 2, title: "Learn Context API", completed: false },
        { id : 3, title: "Learn Redux", completed: false },
        { id : 4, title: "Learn React Router", completed: false },
        { id : 5, title: "Learn React Hooks", completed: false },
    ],
        addTodo: (title) => {},
        updateTodo: (id,title) => {},
        deleteTodo: (id,) => {},
        toggleTodocompleted: (id) => {},
});
 export const useTODOContext = () => 
    {return useContext(TODOContext)

    }
       export const TODOProvider = ({ children }) => {
    const [todos, setTodos] = useState([
        { id : 1, title: "Learn React", completed: false },
        { id : 2, title: "Learn Context API", completed: false },
        { id : 3, title: "Learn Redux", completed: false },
        { id : 4, title: "Learn React Router", completed: false },
        { id : 5, title: "Learn React Hooks", completed: false },
    ]);

    const addTodo = (title) => {
        const newTodo = { id: Date.now(), title, completed: false };
        setTodos([...todos, newTodo]);
    };

    const updateTodo = (id, title) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title } : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodocompleted = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    return (
        <TODOContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodocompleted }}>
            {children}
        </TODOContext.Provider>
    );
};