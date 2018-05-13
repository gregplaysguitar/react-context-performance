import React, { Component, PureComponent } from 'react';

import './App.css';


const createBranches = (count, depth = 0) => {
  const branches = [];
  for (var i = 0; i < count; i++) {
    branches.push({
      name: `Branch ${i}`,
      branches: depth < 4 ? createBranches(count, depth + 1) : []
    })
  }
  return branches
}

const branches = createBranches(4)


class ChildProps extends PureComponent {
  render() {
    const {value, name} = this.props
    return (
      <div>
        <h6>{name}</h6>
        <p>Value: {value}</p>
        <ul>
          {this.props.branches.map((branch, i) => (
            <li key={i}>
              <ChildProps branches={branch.branches} value={value} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export class AppProps extends Component {
  constructor() {
    super()
    this.state = {
      value: 1
    }
  }
  componentWillMount() {
    setInterval(() => {
      this.setState({
        value: this.state.value + 1
      })
    }, 1000)
  }
  render() {
    return (
      <ChildProps value={this.state.value} branches={branches} name='top level' />
    );
  }
}


const {Provider, Consumer} = React.createContext(1);

class ChildContext extends PureComponent {
  render() {
    const {name} = this.props
    return (
      <div>
        <h6>{name}</h6>
        <Consumer>
          {value => <p>Value: {value}</p>}
        </Consumer>
        <ul>
          {this.props.branches.map((branch, i) => (
            <li key={i}>
              <ChildContext branches={branch.branches} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export class AppContext extends Component {
  constructor() {
    super()
    this.state = {
      value: 1
    }
  }
  componentWillMount() {
    setInterval(() => {
      this.setState({
        value: this.state.value + 1
      })
    }, 1000)
  }
  render() {
    return (
      <Provider value={this.state.value}>
        <ChildContext branches={branches} name='top level' />
      </Provider>
    );
  }
}
