import React, { useState } from 'react';
import '../App.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState({
    'To Do': ['Task 1', 'Task 2', 'Task 3'],
    'In Progress': ['Task 4'],
    'Done': ['Task 5']
  });

  const moveTask = (task, from, to) => {
    const updatedTasks = { ...tasks };
    updatedTasks[from] = updatedTasks[from].filter(t => t !== task);
    updatedTasks[to] = [...updatedTasks[to], task];
    setTasks(updatedTasks);
  };

  return (
    <div className="tasks-page">
      <h1>Task Board</h1>
      <div className="task-columns">
        {Object.keys(tasks).map((column) => (
          <div className="task-column" key={column}>
            <h3>{column}</h3>
            <ul>
              {tasks[column].map((task, index) => (
                <li key={index} className="task-item">
                  <span>{task}</span>
                  <div className="task-buttons">
                    <button onClick={() => moveTask(task, column, 'To Do')}>To Do</button>
                    <button onClick={() => moveTask(task, column, 'In Progress')}>In Progress</button>
                    <button onClick={() => moveTask(task, column, 'Done')}>Done</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;