import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import './todolist.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [updatedTask, setUpdatedTask] = useState('');

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editIndex === -1) {
      if (task.trim() !== '') {
        setTodos([...todos, { task, date }]);
        setTask('');
      }
    } else {
      if (updatedTask.trim() !== '') {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { task: updatedTask, date };
        setTodos(updatedTodos);
        setEditIndex(-1);
        setUpdatedTask('');
      }
    }
  };

  const handleDelete = (index) => {
    if (editIndex === index) {
      setEditIndex(-1);
      setUpdatedTask('');
    }
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleComplete = (index) => {
    const completedIndex = completedTasks.indexOf(index);
    if (completedIndex > -1) {
      const updatedCompletedTasks = [...completedTasks];
      updatedCompletedTasks.splice(completedIndex, 1);
      setCompletedTasks(updatedCompletedTasks);
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setUpdatedTask(todos[index].task);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={editIndex === -1 ? task : updatedTask}
          onChange={handleInputChange}
          placeholder={editIndex === -1 ? "Enter task" : "Update task"}
        />
        <button type="submit">
          {editIndex === -1 ? (
            <span>Add Task</span>
          ) : (
            <span><FontAwesomeIcon icon={faSave} /> Save</span>
          )}
        </button>
      </form>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="calendar"
      />
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${completedTasks.includes(index) ? 'completed' : ''}`}
          >
            {editIndex === index ? (
              <input
                type="text"
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
                placeholder="Update task"
              />
            ) : (
              <div className="todo-details">
                <strong>{todo.date.toDateString()}:</strong> {todo.task}
              </div>
            )}
            <div className="todo-actions">
              {editIndex === index ? (
                <button onClick={handleFormSubmit}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
              ) : (
                <button onClick={() => handleEdit(index)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
              <button onClick={() => handleDelete(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button onClick={() => handleComplete(index)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
