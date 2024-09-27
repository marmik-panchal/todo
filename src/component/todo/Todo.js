import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';
import '../../css/Todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('https://dummyjson.com/todos?limit=5');
            const data = await response.json();
            const apiTodos = data.todos.map(todo => ({
                id: todo.id,
                text: todo.todo,
                completed: todo.completed,
            }));
            setTodos(apiTodos);
        };

        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos && savedTodos.length) {
            setTodos(savedTodos);
        } else {
            fetchTodos();
        }
    }, []);

    useEffect(() => {
        if (todos.length) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = (task) => {
        const newTodo = { id: Date.now(), text: task, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
        return true;
    });

    return (
        <div className="todo-app">
            <h1>Todo List</h1>
            <AddTodo addTodo={addTodo}/>
            <Filter setFilter={setFilter}/>
            <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        </div>
    );
};

export default Todo;
