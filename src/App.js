import "./App.css";
import React, { useState, useEffect } from "react";
import { ListItem } from './ListItem';
import { EditItem } from './EditItem';

const todoListKey = 'todoItems';
const getTodoItemsFromLS = () => {
  return JSON.parse(localStorage.getItem(todoListKey)) || [];
}

const TodoList = (props) => {

  const [todoItems, setTodoItems] = useState([]);

  const saveTodoListToLS = (todoItems) => {
    localStorage.setItem(todoListKey, JSON.stringify(todoItems));
  }

  useEffect(() => {
    const todoItemsFromLS = getTodoItemsFromLS();
    setTodoItems(todoItemsFromLS)
  }, [])

  const addItem = () => {
    let newList = todoItems.slice();
    newList.push({ id: Date.now(), task: '', checked: false, isEdit: true });
    setTodoItems(newList);
    saveTodoListToLS(newList);
  };
  const deleteItem = (todoItem) => {
    const newList = todoItems.filter(item => todoItem !== item);
    setTodoItems(newList);
    saveTodoListToLS(newList);
  };

  const checkItem = (todoItem) => {

  }

  const saveEdit = (todoItem) => {
    const index = todoItems.findIndex(item => item.id === todoItem.id);
    const newTodoItems = [...todoItems];
    newTodoItems[index] = todoItem;
    setTodoItems(newTodoItems);
    saveTodoListToLS(newTodoItems);
  }

  const editItem = (todoItem) => {
    
  }

    return (
      <ul>
        {todoItems.map((todoItem => (todoItem.isEdit ? 
          <EditItem
            todoItem={todoItem}
            saveEdit={saveEdit}
          /> : 
          <ListItem
            todoItem={todoItem}
            deleteHandler={deleteItem}
            checkHandler={checkItem}
            editHandler={editItem}
          />)))}
        <li key="add">
          <button id="addItem" onClick={addItem}>
            +
          </button>
        </li>
      </ul>
    );
}

function App() {
  return (
    <div className="App">
      <h1>My first To-do application</h1>
      <TodoList />
    </div>
  );
}

export default App;
