import React from "react";

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
        <h1>
          {this.state.count}
        </h1>
        <button onClick={this.onClick.bind(this)}>Count Up!!</button>
      </div>
    );
  }
}

const Sea = require("./lib");
const app = Sea.open(<App />);
