import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result1: 0,
      result2: 0
    };
    this.t0 = new Date();
  }
  success1(x) {
    console.log(x);
    let r1 = new Date() - this.t0;
    this.setState({
      result1: r1
    });
  }
  success2(x) {
    console.log(x);
    let r2 = new Date() - this.t0;
    this.setState({
      result2: r2
    });
  }
  render() {
    return (
      <div>
        <div className="header">
          <Time1 result={this.state.result1} />
          <Time2 result={this.state.result2} />
        </div>
        <Playground
          success1={this.success1.bind(this)}
          success2={this.success2.bind(this)}
        />
      </div>
    );
  }
}

function Time1(props) {
  return (
    <div className="time">
      <h2>兔子用时</h2>
      <div>{props.result}</div>
    </div>
  );
}

function Time2(props) {
  return (
    <div className="time">
      <h2>乌龟用时</h2>
      <div>{props.result}</div>
    </div>
  );
}

function Playground(props) {
  let success1 = props.success1;
  let success2 = props.success2;
  return (
    <div className="playground">
      <Track1 success={success1} />
      <Track2 success={success2} />
    </div>
  );
}

class Track1 extends React.Component {
  constructor(props) {
    super();
    let n = 0;
    this.state = {
      style: {
        transform: `translateX(${n}%)`
      }
    };
    let timerId = setInterval(() => {
      n += 25;
      this.setState({
        style: {
          transform: `translateX(${n}%)`
        }
      });
      if (n >= 100) {
        window.clearInterval(timerId);
        this.props.success("我是小兔子");
      }
    }, 1000);
  }
  render() {
    return (
      <div>
        <div className="player" style={this.state.style}>
          兔子
        </div>
        <div className="track" />
      </div>
    );
  }
}

class Track2 extends React.Component {
  constructor(props) {
    super();
    let n = 0;
    this.state = {
      style: {
        transform: `translateX(${n}%)`
      }
    };
    let timerId = setInterval(() => {
      n += 20;
      this.setState({
        style: {
          transform: `translateX(${n}%)`
        }
      });
      if (n >= 100) {
        window.clearInterval(timerId);
        this.props.success("我是小乌龟");
      }
    }, 1000);
  }
  render() {
    return (
      <div>
        <div className="player" style={this.state.style}>
          乌龟
        </div>
        <div className="track" />
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
