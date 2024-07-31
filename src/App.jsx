import './App.css'
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState(['asdf1', 'asdf2', 'asdf3'])

  function handleCompleteTask (task) {
    setTasks((prevState) => {
      const index = prevState.indexOf(task)
      const newTasks = [...prevState]
      newTasks.splice(index, 1)
      return newTasks
    })

  }

  function increaseTaskPriority (task) {
    setTasks((prevState) => {
      const index = prevState.indexOf(task)
      if (index === 0) {
        return prevState
      }
      const newTasks = [...prevState]
      const temp = newTasks[index]
      newTasks[index] = newTasks[index - 1]
      newTasks[index - 1] = temp
      return newTasks
    })
  }

  function decreaseTaskPriority (task) {
    setTasks((prevState) => {
      const index = prevState.indexOf(task)
      if (index === prevState.length - 1) {
        return prevState
      }
      const newTasks = [...prevState]
      const temp = newTasks[index]
      newTasks[index] = newTasks[index + 1]
      newTasks[index + 1] = temp
      return newTasks
      })
  }

  return (
    <div className='container'>
        <div className='row'>
          <div className='col-auto'>
            <button className='btn btn-primary'>Add Task</button>
          </div>
          <div className='col-auto'>
            <input id='addTask' className='form-control col-auto' type='text'></input>
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
                <p className='ms-2 mb-0 h-auto'>{task}</p>
              </div>
              <button className='btn btn-sm btn-primary h-50' type='button' onClick={() => handleCompleteTask(task)}>Complete</button>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default App
