import React from 'react';

export function ListItem({
    todoItem,
    deleteHandler,
    checkHandler,
    editHandler
}) {
    return (
      <li key={todoItem.id}>
        <input
          type="checkbox"
          id={`check${todoItem.id}`}
          onChange={() => checkHandler(todoItem)}
          value={todoItem.checked}
        />
        <label htmlFor={`check${todoItem.id}`}>{todoItem.task}</label>
        <button onClick={() => editHandler(todoItem)}>Edit</button>
        <button onClick={() => deleteHandler(todoItem)}>Delete</button>
      </li>
    );
  }