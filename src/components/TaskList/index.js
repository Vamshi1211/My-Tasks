import './index.css'

const TaskList = props => {
  const {eachTask} = props
  const {tagName, taskName} = eachTask

  return (
    <li className="task-list-item-container">
      <p className="task-name">{taskName}</p>
      <p className="task-tag">{tagName}</p>
    </li>
  )
}

export default TaskList
