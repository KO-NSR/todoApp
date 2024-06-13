"use client";

import { addTask } from "@/api";
import { Todo } from "@/types";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface TodoListProps {
    tasks: Todo[];
}

const AddTask = ({tasks}: TodoListProps) => {
    const [addTaskTitle, setAddTaskTitle] = useState("");
    const [newID, setNewID] = useState(0); //次に追加するタスクのIDをセット
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        let idArray: number[] = [];
        for(let i = 0; i < tasks.length; i++) {
            idArray.push(tasks[i].id);
        }
        const maxNum: number = Math.max(...idArray) + 1; 
        setNewID(maxNum);
        console.log(newID);
    }, [tasks]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (addTaskTitle.trim() === '') {
            setErrMsg("Task cannot be empty.");
            return;
        }

        await addTask({id: newID, text: addTaskTitle});
        setAddTaskTitle("");
        setErrMsg("");
    };
    
    return (
        <form onSubmit={handleSubmit} className="mb-4 space-y-3">
            <input 
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                onChange={(e:ChangeEvent<HTMLInputElement>) => setAddTaskTitle(e.target.value)}
                value={addTaskTitle}
            />
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200">
                Add Task
            </button>
            { errMsg && <div style={{ color: 'red', textAlign: 'center', backgroundColor: 'yellow' }}>※{errMsg}</div>}
        </form>
    );
};

export default AddTask;
