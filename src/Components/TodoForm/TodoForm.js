import React, { Component } from 'react';
import './TodoForm.css';
import { connect } from 'react-redux';
import { addTodo } from '../../Actions/index';

export class TodoForm extends Component {
  
  constructor() {
    super();
    this.state = {
      taskName: '',
      currentTask: '',
      tasks: []
    };
  }

  addTask = (e) => {
    e.preventDefault()
    const { tasks, currentTask } = this.state
    this.setState({ tasks: [...tasks, {currentTask, id: Date.now(), checked: false}] });
    this.setState({ currentTask: '' });
  }

  removeTask = (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    const taskId = e.target.getAttribute('data-id');
    const newTasks = tasks.filter(task => {
      return task.id !== parseInt(taskId);
    });
    this.setState({ tasks: newTasks });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  submitTask = (e) => {
    e.preventDefault();
    const { tasks, taskName } = this.state
    const todo = {
      id: Date.now(),
      taskName,
      tasks,
      urgent: false
    };
    this.props.addTodo(todo)
    this.setState({ taskName: '', currentTask: '', tasks: [] });
  } 

  render() {
    const { taskName, tasks, currentTask } = this.state
    const formmattedTasks = tasks.map(task => {
      return (
        <div key={task.id} className="working-task">
          <button data-id={task.id} className="remove-task-button" onClick={(e) => this.removeTask(e)}>❌</button>
          <p className="working-task-text">{task.currentTask}</p>
        </div>
      )
    })
    return (
      <form className="todo-form">
        <label className="todo-form-label" htmlFor="taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          value={taskName}
          className="todo-form-input"
          onChange={(e) => this.handleChange(e)}
        />
        <label className="todo-form-label" htmlFor="currentTask">Tasks</label>
        <input
          type="text"
          name="currentTask"
          value={currentTask}
          className="todo-form-input"
          onChange={(e) => this.handleChange(e)}
        />
        <button className="add-task-button" disabled={currentTask === ''} onClick={(e) => this.addTask(e)}>Add Task</button>
        <section className="working-tasks">
          {tasks.length ? formmattedTasks : null}
        </section>
        <button className="submit-todo-button" disabled={tasks.length === 0 || taskName === ''} onClick={(e) => this.submitTask(e)}>Sumbit Todo</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodo: todo => dispatch(addTodo(todo))
})

export default connect(null, mapDispatchToProps)(TodoForm);