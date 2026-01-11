import { useState, useEffect } from 'react'
import './App.css'
import { fetchTodos, toggleTodo, deleteTodo, createTodo } from './api/todos'
function App() {

  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // const [summit]


  const load = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await fetchTodos()
      console.log(data)
      setTodos(data)
    } catch (error) {
      setError(error.message ?? 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onToggle = async (id) => {
    try {
      const update = await toggleTodo(id)
      setTodos((prev) => prev.map((t) => (t.id === id ? update : t)))
    } catch (error) {
      alert('토글 실패:' + (error.message ?? 'error'))

    }
  }

  return (
    <div>
      <h1>Todo</h1>
      <form action="">
        <div className="input-wrap">
          <input type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='할일을 입력하세요'

          />
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='내용을 입력하세요'></textarea>
          <button type="submit" >할일 입력</button>
        </div>
        <ul>
          {todos.map((t) => (

            <li key={t.id}>
              <button type='button' onClick={() => onToggle(t.id)}>
                {t.done ? '✅' : '⬜'}
              </button>
              <strong>
                {t.title}
              </strong>
              <span>
                {t.content}
              </span>

            </li>
          ))}
        </ul>


      </form>
    </div>
  )
}

export default App
