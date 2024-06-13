'use client';

import { deleteTodo, editTodo } from "@/api";
import { Todo } from "@/types";
import React, { ChangeEvent, useEffect, useState } from "react";

interface TaskProps {
    task: Todo;
}

const Task = ({task}: TaskProps) => {
    const [onEdit, setOnEdit] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        setOnEdit(true);
    }

    const handleSave = async () => {
        setOnEdit(false);
        await editTodo(task.id, editText);
    }

    const handleDelete = async () => {
        await deleteTodo(task.id);
    }
    
    return (
        <li key={task.id} className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rouded shadow">
            {onEdit ? (
                <input onChange={(e:ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)} type="text" value={editText}/>
            ) : (
                <span>{task.text}</span>
            )}
            
            <div>
                {onEdit ? (
                    <button onClick={handleSave} className="text-blue-500 mr-3">save</button>
                ) : (
                    <button onClick={handleEdit} className="text-green-500 mr-3">edit</button>
                )}
                <button onClick={handleDelete} className="text-red-500">delete</button>
            </div>
        </li>
    )
}

export default Task;
