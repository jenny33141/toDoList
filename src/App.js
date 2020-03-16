import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    inputText: "",
    items: [],
    list: []
  };
  async componentDidMount() {
    const data = await fetch("http://localhost:3010/data");
    const response = await data.json();
    this.setState({ list: response.data });
  }


  changeHandler = e => {
    this.setState({ inputText: e.target.value });
  };

  removeHandler = event => {

    let temp = this.state.list
    let locate = temp[event.target.id].todo

    temp.splice(event.target.id, 1)
    console.log(locate)

    fetch(`http://localhost:3010/remove?address=${locate}`);
    this.setState({ list: temp })
  };

  onSubmit = () => {

    if (this.state.inputText !== "") {
      let newItem = this.state.inputText
      let temp = this.state.list
      temp.push(newItem)
      fetch(`http://localhost:3010/add?address=${newItem}`);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="board">
          <h1 className="header">My To Do List</h1>
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
            <List items={this.state.list} removeHandler={this.removeHandler} />
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
        {item.todo}
        <button id={index} className="delete" onClick={props.removeHandler}>
          x
        </button>
      </li>
    ))}
  </ul>
);

export default App;
