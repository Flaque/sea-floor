import React from "react";
import Foo from "./Foo.js";

console.log(Foo);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  onClick(e) {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <Foo />
        <button onClick={this.onClick.bind(this)}>Count Up!!</button>
      </div>
    );
  }
}

export default App;
