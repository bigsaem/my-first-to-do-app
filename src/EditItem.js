import React, { useState } from 'react';

export function EditItem({
    saveEdit,
    todoItem
}) {
    const [task, setTask] = useState(todoItem.task);
    return (
        <li key={todoItem.id}>
            <input
            type="text"
            value={task}
            onChange={(e) => {
                setTask(e.target.value);
            }}
            />
            <button onClick={() => saveEdit({ ...todoItem, task: task, isEdit: false })}>
                Enter
            </button>
        </li>
    );
}