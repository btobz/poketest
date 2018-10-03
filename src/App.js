import React, { Component } from 'react';
import './App.css';
import Search from './search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      error: '',
    };

    this.search = this.search.bind(this);
  }

  search({query}) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`)
      .then(res => res.json())
      .then(res => {
        return res;
      }).then(json => {
        this.setState({
          query: query,
          data: json,
          error: json.Error,
        }, () => {
        });
      }).catch(err => this.setState({
          error: 'missingno',
          data: [],
      }));
  }

  render() {
console.log(this.state.data)

    let data = this.state.data;
    let name = data.name;
    let error = this.state.error;

    return (
      <div className = "App-component">
      <div className = "App">
        <Search search = {this.search} />
        <p>{name}</p>
        <p>{error}</p>
      </div>
      </div>
    )
  }
}

export default App;
