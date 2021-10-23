import React, { Component } from 'react'

export default class Item extends Component {

	//初始化状态
	state = {
		inEdit: false, //是否进入编辑状态，默认为false
		flag: true,    //是否能够执行onBlur事件
	}

	//双击进入编辑状态
	handleEdit = () => {
		let { todo } = this.props
		this.setState({
			inEdit: true
		}, () => {
			this.refs.myInput.value = todo.value;
			this.refs.myInput.focus();
		})
	}

	render() {
		let { inEdit, flag } = this.state
		let { todo, deleteTodo, ChangeHasCompleted, editTodo } = this.props
		let completed = todo.hasCompleted ? 'completed' : ''
		let haveEditing = inEdit ? completed + ' editing' : completed
		return (
			<li className={haveEditing}>
				<div className='view'>
					<input type="checkbox" className='toggle'
						checked={todo.hasCompleted ? true : false}
						onChange={() => { ChangeHasCompleted(todo) }}
					/>
					<label onDoubleClick={this.handleEdit}>
						{todo.value}
					</label>
					<button className='destroy' onClick={() => deleteTodo(todo)}></button>
				</div>
				<input type="text" className='edit' ref="myInput"

					//输入框失去焦点后的事件处理
					onBlur={e => {
						if (flag) {
							//失去焦点后判断文本框输入的内容是否为空，如果为空则删除当前todo
							if (e.target.value === '') {
								deleteTodo(todo)
							} else {
								todo.value = e.target.value.trim();
								editTodo(todo)
								this.setState({ inEdit: false })
							}
						}
					}}

					//输入框按下回车键的事件处理
					onKeyUp={e => {
						if (e.keyCode === 13) {
							//判断按下回车键后文本框输入的内容是否为空，如果为空则删除当前todo
							if (e.target.value === '') {
								deleteTodo(todo)
							} else {
								todo.value = e.target.value.trim();
								editTodo(todo)
								this.setState({ inEdit: false })
							}
						}

						//解决ESC键不能取消输入内容的冲突
						if (e.keyCode === 27) {
							this.setState({
								inEdit: false,
								flag: false
							}, () => setTimeout(() => {
								this.setState({ flag: true })
							}, 10)
							)
						}
					}}
				/>
			</li>
		)
	}
}
