import React, { Component } from 'react'

export default class Footer extends Component {
	render() {
		let { todoNums, view, viewTodo, todoLengths, ClearAllTodo } = this.props
		return (
			<footer className='footer'>
				<span className='todo-count'>
					<strong>{todoNums}</strong>
					<span> {todoNums < 2 ? 'item' : 'items'} left </span>
				</span>

				<ul className='filters'>
					<li>
						<a href="#/all" className={view == 'all' ? 'selected' : ''} onClick={() => viewTodo('all')}>All</a>
					</li>
					<li>
						<a href="#/active" className={view === 'active' ? 'selected' : ''} onClick={() => viewTodo('active')}>Active</a>
					</li>
					<li>
						<a href="#/completed" className={view === 'completed' ? 'selected' : ''} onClick={() => viewTodo('completed')}>Completed</a>
					</li>
				</ul>
				{todoLengths > todoNums ? <button className='clear-completed' onClick={() => ClearAllTodo()}>
					Clear completed
				</button> : ''}
				
			</footer>
		)
	}
}
