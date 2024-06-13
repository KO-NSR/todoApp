import { Todo } from "./types";

export const getTasks = async (): Promise<Todo[]> => {
    const res = await fetch('http://localhost:3001/tasks', { cache: 'no-store'});
    const todos = res.json();

    return todos;
}

export const addTask = async (todo: Todo): Promise<Todo> => {
    // try {
    const res = await fetch('http://localhost:3001/tasks',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });
    if (!res.ok) {
        const errDetails = await res.text();
        throw new Error(`HTTP error!! status: ${res.status}, details: ${errDetails}`);
    }
    const newTodos = res.json();
    return newTodos;
    // } catch (error) {
    //     console.log("Error adding task:", error);
    //     throw new Error(`Failed to add task: ${error.message}`);
    // }
}

export const editTodo = async (id: number, newText: string): Promise<Todo> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: newText }),
    });
    const updatedTodo = res.json();
    return updatedTodo;
}

export const deleteTodo = async (id: number): Promise<Todo> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        const errDetails = await res.text();
        throw new Error(`HTTP error!! status: ${res.status}, details: ${errDetails}`);
    }
    const deleteTodo = res.json();
    return deleteTodo;
}