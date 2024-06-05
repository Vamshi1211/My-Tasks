import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import TaskList from './components/TaskList'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isActive: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isActive: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isActive: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isActive: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isActive: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isActive: false,
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskList: [],
    taskName: '',
    tagName: tagsList[0].optionId,
    initialTagsList: tagsList,
  }

  onChangeTaskName = event => {
    this.setState({taskName: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({tagName: event.target.value})
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {taskName, tagName} = this.state
    const taskData = {
      id: uuidV4(),
      taskName,
      tagName,
      isActive: false,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, taskData],
      taskName: '',
      tagName: tagsList[0].optionId,
    }))
  }

  onClickTag = (id, text) => {
    this.setState(prevState => ({
      initialTagsList: prevState.initialTagsList.map(eachItem => {
        if (eachItem.optionId === id) {
          return {...eachItem, isActive: !eachItem.isActive}
        }
        return eachItem
      }),
      taskList: prevState.taskList.map(eachItem => {
        if (eachItem.tagName === text.toUpperCase()) {
          return {...eachItem, isActive: !eachItem.isActive}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {taskList, tagName, taskName, initialTagsList} = this.state
    console.log(tagName)

    const filteredData = taskList.filter(eachItem => eachItem.isActive === true)

    const activeIdList = taskList.map(eachItem => eachItem.isActive === true)

    const activeId = activeIdList.findIndex(eachItem => eachItem === true)

    return (
      <div className="bg-container">
        <div className="create-task-container">
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <h1 className="task-heading">Create a task!</h1>
            <label className="label-text" htmlFor="taskId">
              Task
            </label>
            <input
              className="task-input"
              id="taskId"
              placeholder="Enter the task here"
              onChange={this.onChangeTaskName}
              value={taskName}
            />
            <label className="label-text" htmlFor="tagsId">
              Tags
            </label>
            <select
              id="tagsId"
              className="select-input"
              onChange={this.onChangeSelect}
              value={tagName}
            >
              {tagsList.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-container">
          <div className="tags-container">
            <h1 className="tags-heading">Tags</h1>
            <ul className="tag-list-container">
              {initialTagsList.map(eachItem => {
                const {displayText, optionId, isActive} = eachItem

                const isActiveClass = isActive ? 'active-btn' : ''
                const onClickTagButton = () => {
                  this.onClickTag(optionId, displayText)
                }
                return (
                  <li className="tag-list-item-container" key={optionId}>
                    <button
                      type="button"
                      className={`${isActiveClass} tag-button`}
                      onClick={onClickTagButton}
                    >
                      {displayText}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="tasks-container">
            <h1 className="tags-heading">Tasks</h1>
            {taskList.length > 0 ? (
              <ul className="task-list-container">
                {activeId === -1
                  ? taskList.map(eachItem => (
                      <TaskList key={eachItem.id} eachTask={eachItem} />
                    ))
                  : filteredData.map(eachItem => (
                      <TaskList key={eachItem.id} eachTask={eachItem} />
                    ))}
              </ul>
            ) : (
              <div className="no-task-container">
                <p className="no-task-para">No Tasks Added Yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
