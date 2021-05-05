import "./App.css";
import React, { useState } from "react";

function ListItem(props) {
  const [isForm, setIsForm] = useState(props.val ? false : true);
  const [task, setValue] = useState(props.val || "");
  const [checked, setChecked] = useState(props.checked || false);
  const removeTask = () => {
    localStorage.removeItem(props.index);
    console.log("calling deleteHandler");
    props.deleteHandler(props.index);
  };
  const makeTask = () => {
    localStorage.setItem(
      props.index,
      JSON.stringify({ task: task, checked: checked })
    );
    setIsForm(false);
  };
  const editTask = () => {
    setIsForm(true);
  };
  const checkToggle = () => {
    localStorage.setItem(
      props.index,
      JSON.stringify({
        task: task,
        checked: !checked,
      })
    );
    setChecked(!checked);
  };
  if (isForm) {
    return (
      <li key={props.index}>
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button onClick={makeTask}>Enter</button>
      </li>
    );
  }
  return (
    <li key={props.index}>
      <input
        type="checkbox"
        id={`check${props.index}`}
        onChange={checkToggle}
        defaultChecked = {checked}
      />
      <label htmlFor={`check${props.index}`}>{task}</label>
      <button onClick={editTask}>Edit</button>
      <button onClick={removeTask}>Delete</button>
    </li>
  );
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    const listItemsFromDB = this.initializeList();
    this.state = {
      listItems: listItemsFromDB,
    };
  }
  initializeList = () => {
    const listItemsFromDB = [];
    for (const key of Object.keys(localStorage)) {
      const val = JSON.parse(localStorage.getItem(key));
      listItemsFromDB.push(
        <ListItem
          key={key}
          index={key}
          val={val.task}
          checked={val.checked}
          deleteHandler={this.delete}
        />
      );
    }
    return listItemsFromDB;
  };

  addItem = () => {
    let newList = this.state.listItems.slice();
    const curTime = Date.now();
    newList.push(
      <ListItem key={curTime} index={curTime} deleteHandler={this.delete} />
    );
    console.log(this.state.listItems);
    this.setState({
      listItems: newList,
    });
  };
  delete = (key) => {
    console.log("key", key);
    const newList = this.state.listItems.slice();
    newList.forEach((item, index) => {
      if (parseInt(item.key) === parseInt(key)) {
        newList.splice(index, 1);
        console.log(newList)
        this.setState({
          listItems: newList,
        });
        return;
      }
    });
  };
  render() {
    return (
      <ul>
        {this.state.listItems}
        <li key="add">
          <button id="addItem" onClick={this.addItem}>
            +
          </button>
        </li>
      </ul>
    );
  }
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
