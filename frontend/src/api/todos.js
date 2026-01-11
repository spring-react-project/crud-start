export async function fetchTodos() {
    const res = await fetch("/api/todos")
    if (!res.ok) throw new Error("Failed to fetch todos")

    return res.json()
}

export async function createTodo(title, content) {
    const res = await fetch("/api/todos", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, content, done: false })
    })

    if (!res.ok) throw new Error('Failed to create todo')

    return res.json()
}


// toggle
export async function toggleTodo(id) {
    const res = await fetch(`/api/todos/${id}/toggle`, {
        method: 'PATCH'
    })


    if (!res.ok) throw new Error('Failed to Toggle todo')

    return res.json()
}

// delete
export async function deleteTodo(id) {
    const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
    })


    if (!res.ok) throw new Error('Failed to delete todo')

}



