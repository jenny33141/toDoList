import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    inputText: "",
    items: []
  };

  changeHandler = e => {
    this.setState({ inputText: e.target.value });
  };

  removeHandler = index => {
    let listItems = this.state.items;
    listItems.splice(index, 1);
    this.setState({ items: listItems });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      inputText: "",
      items: [...this.state.items, this.state.inputText]
    });
  };

  render() {
    console.log(this.state.items);
    return (
      <div className="container">
        <div className="board">
          <h1 class="header">My To Do List</h1>
          <div className="button">
            <form onSubmit={this.onSubmit}>
              <input
                className="input"
                type="text"
                onChange={event => this.changeHandler(event)}
                value={this.state.inputText}
              ></input>
              <button className="submit">click to add</button>
            </form>
          </div>
          <div className="list">
            <List items={this.state.items} removeHandler={this.removeHandler} />
          </div>
        </div>
      </div>
    );
  }
}
const List = props => (
  <ul>
    {props.items.map((item, index) => (
      <li key={index}>
        {item}
        <button className="delete" onClick={() => props.removeHandler(index)}>
          x
        </button>
      </li>
    ))}
  </ul>
);

export default App;
