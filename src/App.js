import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      error: '',
    };
  }

  componentWillMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/803/')
      .then(res => res.json())
      .then(res => {
        return res;
      }).then(json => {
        this.setState({
          data: json,
          error: json.Error,
        }, () => {
          console.log(json);
          console.log(this.state.data);
        });
      }).catch(err => this.setState({
        data: [],
        error: 'Error occurred, you big goofball',
      }));
  }
  
  render() {
    let data = this.state.data;
    let name = data.name;
    let error = this.state.error;

    return (
      <div className="App">
        <p>{name}</p>
        <p>{error}</p>
        <div style={{backgroundColor: "#FF0000"}}>red</div>
      </div>
    )
  }
}

export default App;
