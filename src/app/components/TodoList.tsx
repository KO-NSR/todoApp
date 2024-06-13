"use client";

import { Todo } from "@/types";
import React, { useEffect } from "react";
import Task from "./Task";

interface TodoListProps {
    tasks: Todo[];
}

const TodoList = ({ tasks }: TodoListProps) => {

    return (
        <ul className="space-y-3">
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </ul>
    )
}

export default TodoList;
