import React, { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Todo } from '../model'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number
}
const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState(todo.todo)

  const handleDone = (id: number) => {
    setTodos(
      todos.map(item =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    )
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos(
      todos.map(item => (item.id === id ? { ...item, todo: editTodo } : item))
    )

    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          action=''
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={e => {
            handleEdit(e, todo.id)
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              type='text'
              value={editTodo}
              onChange={e => {
                setEditTodo(e.target.value)
              }}
            />
          ) : todo.isDone ? (
            <s className='todos__single--text'>{todo.todo}</s>
          ) : (
            <span className='todos__single--text'>{todo.todo}</span>
          )}

          <div className=''>
            <span
              className='icon'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className='icon' onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
