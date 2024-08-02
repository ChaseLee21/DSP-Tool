import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const storedTasks = retrieveTasks()
    setTasks(storedTasks || [])
  }, [])

  function retrieveTasks () {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (!tasks) return []
    return tasks.sort((a, b) => a.priority - b.priority)
  }

  function storeTasks (tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    retrieveTasks()
  }

  const addTask = (e) => {
    if (!e || e.key === 'Enter') {
      const newTask = (e) ? { id: tasks.length + 1, task: e.target.value, priority: 1 } : { id: tasks.length + 1, task: document.getElementById('addTask').value, priority: 1 };
      setTasks([newTask, ...tasks]);
      storeTasks([newTask, ...tasks]);
      document.getElementById('addTask').value = ''; // Clear the input field
    }
  };

  const handlePriorityChange = (event, task) => {
    const newPriority = event.target.value;
    console.log(newPriority);
    const newTasks = tasks.map(t => t.id === task.id ? { ...t, priority: newPriority } : t);
    setTasks(newTasks);
    if (newPriority > 0) {
      storeTasks(newTasks);
    }
  };

  const increaseTaskPriority = (task) => {
    const newTasks = tasks.map(t => t.id === task.id ? { ...t, priority: parseInt(t.priority) - 1 } : t);
    setTasks(newTasks);
    storeTasks(newTasks);
    window.location.reload();
  };

  const decreaseTaskPriority = (task) => {
    const newTasks = tasks.map(t => t.id === task.id ? { ...t, priority: parseInt(t.priority) + 1 } : t);
    setTasks(newTasks);
    storeTasks(newTasks);
    window.location.reload();
  };

  const handleCompleteTask = (task) => {
    const newTasks = tasks.filter(t => t.id !== task.id);
    setTasks(newTasks);
    storeTasks(newTasks);
  };

  const updateTaskList = (event) => {
    if (event.key === 'Enter') {
      window.location.reload();
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <h1>DSP Task List</h1>
      </div>
      <div className='row my-2'>
        <div className='col-auto'>
          <button className='btn btn-primary' onClick={() => addTask()}>Add Task</button>
        </div>
        <div className='col-auto'>
          <input id='addTask' className='form-control col-auto' type='text' onKeyUp={addTask}></input>
        </div>
      </div>
      <ul id='taskList' className='list-group container'>
        {tasks.map((task, index) => (
          <li key={index} className='d-flex justify-content-between align-items-center list-group-item'>
            <div className='d-flex align-items-center'>
              <div className='d-flex flex-column'>
                <svg onClick={() => increaseTaskPriority(task)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                  <path  d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                </svg>
                <svg onClick={() => decreaseTaskPriority(task)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
                </svg>
              </div>
              <input type='number' value={task.priority} onKeyUp={(event) => updateTaskList(event)} onChange={(event) => handlePriorityChange(event, task)}></input>
              <p className='ms-2 mb-0 h-auto'>{task.task}</p>
            </div>
            <button className='btn btn-sm btn-primary h-50' type='button' onClick={() => handleCompleteTask(task)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
