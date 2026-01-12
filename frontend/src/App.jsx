import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchTodos, toggleTodo, deleteTodo, createTodo } from "./api/todos";
function App() {
 const [todos, setTodos] = useState([]);
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const titleRef = useRef(null);
 // const [summit]

 const load = async () => {
  try {
   setLoading(true);
   setError("");
   const data = await fetchTodos();
   console.log(data);
   setTodos(data);
  } catch (error) {
   setError(error.message ?? "error");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  load();
 }, []);

 const onAdd = async (e) => {
  e.preventDefault();
  const trimmed = title.trim();
  if (!trimmed) return;
  try {
   const createdTodo = await createTodo(trimmed, content);
   setTodos((prev) => [...prev, createdTodo]);
   setTitle("");
   setContent("");
   if (titleRef.current) {
    titleRef.current.focus();
   }
  } catch (error) {
   alert("추가 실패:" + (error.message ?? "error"));
  }
 };

 const onToggle = async (id) => {
  try {
   const update = await toggleTodo(id);
   setTodos((prev) => prev.map((t) => (t.id === id ? update : t)));
  } catch (error) {
   alert("토글 실패:" + (error.message ?? "error"));
  }
 };
 const onDelete = async (id) => {
  try {
   const data = confirm("삭제 하시겠습니까?");
   if (data) {
    await deleteTodo(id);
   }

   setTodos((prev) => prev.filter((t) => t.id !== id));
  } catch (error) {
   alert("삭제 실패:" + (error.message ?? "error"));
  }
 };
 if (loading) return <div style={{ padding: 20 }}>로딩중...</div>;
 if (error) return <div style={{ padding: 20 }}>에러: {error}</div>;
 return (
  <div>
   <h1>Todo</h1>
   <form action="" onSubmit={onAdd}>
    <div className="input-wrap">
     <input
      type="text"
      ref={titleRef}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="할일을 입력하세요"
     />
     <textarea
      name="content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      onKeyDown={(e) => {
       if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onAdd(e);
       }
      }}
      placeholder="내용을 입력하세요"
     ></textarea>
     <button type="submit">할일 입력</button>
    </div>
    <ul>
     {todos.map((t) => (
      <li key={t.id}>
       <button type="button" onClick={() => onToggle(t.id)}>
        {t.done ? "✅" : "⬜"}
       </button>
       <div>
        
       <strong>{t.title}</strong>
       <span>{t.content}</span>
       </div>
       <button onClick={() => onDelete(t.id)}>삭제</button>
      </li>
     ))}
    </ul>
   </form>
  </div>
 );
}

export default App;
