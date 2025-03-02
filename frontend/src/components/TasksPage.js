import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../App.css";

const ItemType = "TASK";

const Task = ({ task, column, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { task, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {task}
    </div>
  );
};

const Column = ({ title, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => moveTask(item.task, item.column, title),
  });

  return (
    <div ref={drop} className="task-column">
      <h3 className="task-column-title">{title}</h3>
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task key={index} task={task} column={title} moveTask={moveTask} />
        ))}
      </div>
    </div>
  );
};

const TasksPage = () => {
  const [tasks, setTasks] = useState({
    "To Do": ["Walk the Cattle", "Escort the Queen", "Feed The Hens"],
    "In Progress": ["Deliver Wheat"],
    Done: ["Mine Iron"],
  });

  const addTask = () => {
    const newTask = prompt("Enter the new task:");
    if (newTask) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        "To Do": [...prevTasks["To Do"], newTask],
      }));
    }
  };

  const moveTask = (task, from, to) => {
    if (from === to) return; // Prevent unnecessary state updates
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[from] = updatedTasks[from].filter((t) => t !== task);
      updatedTasks[to] = [...updatedTasks[to], task];
      return updatedTasks;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tasks-page">
        <h1 className="task-title">Task Board</h1>
        <button className="cool_button" onClick={addTask}>
          Add Task +
        </button>
        <div className="task-columns">
          {Object.keys(tasks).map((column) => (
            <Column
              key={column}
              title={column}
              tasks={tasks[column]}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TasksPage;
