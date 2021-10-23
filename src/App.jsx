import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import Item from './Item'
import Footer from './Footer'

export default class App extends Component {

	//初始化状态
	state = {
		todoDatas: [],
		todoNums: 0,    //todo未完成条数
		view: 'all',   //todo过滤，all表示全部选中，active表示未完成的todo，completed表示已完成的todo
		flag: false,   //默认全不选
	}

	//添加todo的功能模块
	addTodo = (e) => {
		let { todoDatas, todoNums } = this.state
		if (e.keyCode !== 13 || e.target.value.trim() === '') return;
		let todo = {}
		todo.id = nanoid()
		todo.value = e.target.value.trim();
		todo.hasCompleted = false;  //标识todo是否已经完成，默认为false未完成
		todoDatas.push(todo);
		todoNums++
		this.setState({ todoDatas, todoNums })
		e.target.value = '';
	}

	//删除todo功能模块
	deleteTodo = (todo) => {
		let { todoDatas, todoNums } = this.state;
		todoDatas = todoDatas.filter(value => {
			if (value.id === todo.id) {
				if (!value.hasCompleted) {
					todoNums--;
				}
				return false
			}
			return true
		})
		this.setState({ todoDatas, todoNums })
	}

	//改变todo的状态
	ChangeHasCompleted = (todo) => {
		let { todoDatas, todoNums } = this.state
		todoDatas = todoDatas.map(value => {
			if (value.id === todo.id) {
				value.hasCompleted = !todo.hasCompleted
				if (value.hasCompleted) {
					todoNums--;
				} else {
					todoNums++;
				}
			}
			return value
		})
		this.setState({ todoDatas, todoNums })
	}

	//更改todo的内容模块
	editTodo = (todo) => {
		let { todoDatas } = this.state
		todoDatas = todoDatas.map(value => {
			if (value.id === todo.value) {
				value.value = todo.value
			}
			return value
		})
		this.setState({ todoDatas })
	}

	//过滤todo
	viewTodo = (view) => {
		this.setState({ view })
	}

	//清除所有已完成的todo
	ClearAllTodo = () => {
		let { todoDatas } = this.state
		todoDatas = todoDatas.filter(todo => {
			if (todo.hasCompleted) {
				return false
			}
			return true
		})
		this.setState({ todoDatas })
	}

	//全选和全不选功能
	allSelector = () => {
		let { todoDatas, todoNums, flag } = this.state
		flag = !flag;
		if (flag) {
			todoDatas = todoDatas.map(value => {
				value.hasCompleted = true;
				return value
			})
			todoNums = 0;
		} else {
			todoDatas = todoDatas.map(value => {
				value.hasCompleted = false;
				return value
			})
			todoNums = todoDatas.length;
		}
		this.setState({ todoDatas, todoNums, flag })
	}

	render() {
		let { addTodo, allSelector } = this
		let { todoDatas, todoNums, view } = this.state
		let todoLengths = todoDatas.length

		let filterDatas = todoDatas.filter(todo => {
			switch (view) {
				case 'all':
					return true
				case 'active':
					return !todo.hasCompleted
				case 'completed':
					return todo.hasCompleted
			}
		})
		let items = filterDatas.map(todo => {
			return <Item key={todo.id} todo={todo} {...this} />
		})
		return (
			<section className='todoapp'>
				<header className='header'>
					<h1>Todos</h1>
					<input type="text" className='new-todo' placeholder="what need to be done?" onKeyUp={addTodo} />
				</header>
				<section className='main'>
					{todoLengths ? <input type="checkbox" id="toggle-all" className='toggle-all' onChange={allSelector}
						checked ={todoNums == 0 ? true : false}
					/> : ''}
					<label htmlFor="toggle-all"></label>
					<ul className='todo-list'>
						{items}
					</ul>
				</section>
				{todoLengths > 0 ? <Footer todoNums={todoNums} todoLengths={todoLengths} view={view} {...this} /> : ''}
			</section>
		)
	}
}
