import React, { Component } from 'react';
import './App.css';
import Search from './itemsearch';
import styled, { css } from 'styled-components';

const Wrapper = styled.section`
padding: 2em;
background: firebrick;
`;

const Button = styled.button`
background: palevioletred;
border-radius: 3px;
border: 2px solid white;
color: white;
margin: 0 1em;
padding: 0.25em 1em;
`;


class Items extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      error: '',
    };

    this.search = this.search.bind(this);
    this.toggleForward = this.toggleForward.bind(this);
    this.toggleBackward = this.toggleBackward.bind(this);
  }

  search({query}) {
    fetch(`https://pokeapi.co/api/v2/item/${query}/`)
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
          error: 'currently out of stock',
          data: [],
      }));
  }

  toggleForward() {
    let searchQuery = Number(this.state.query);
    let newQuery = null;
    if (searchQuery === 847) {
      newQuery = 1;
    } else {
      newQuery = Number(this.state.query) + 1;
    }
    this.setState({query: newQuery})
    this.search({query: newQuery})
  }

  toggleBackward() {
    let searchQuery = Number(this.state.query);
    let newQuery = null;
    if (searchQuery === 1) {
      newQuery = 847;
    } else {
      newQuery = searchQuery - 1;
    }
    this.setState({query: newQuery});
    this.search({query: newQuery})
  }

render() {
console.log(this.state.data)
console.log(this.state.query)

    let sprite = null;
    let effect = null;
    let error = this.state.error;
    let forwardButton = null;
    let backwardButton = null;

    const itemEffects = this.state.data.effect_entries

    if (itemEffects !== undefined) {
      effect = this.state.data.effect_entries[0].effect
      sprite = <img src={this.state.data.sprites.default} height="60" width="60" />;
      forwardButton = <Button type="button" onClick={this.toggleForward}>Next Item</Button>
      backwardButton = <Button type="button" onClick={this.toggleBackward}>Previous Item</Button>
    }

    return (
      <div className = "App-component">
        <div className = "App">
          <div className = "App-search">
            <Search search = {this.search} />
          </div>
            {
              (sprite) 
              ? (
                  <Wrapper>
                    <div className = "App-text">
                      <p> {this.state.data.name} </p>
                      <p> Item No. {this.state.data.id} </p>
                      <p> {effect} </p>
                      <p> Cost: {this.state.data.cost} </p>
                      {sprite}
                      <p> {backwardButton} {forwardButton} </p>
                      {
                        this.state.error
                        ? <p>{this.state.error}</p>
                        : null
                      }
                    </div>
                  </Wrapper>
               ) : <p>{error}</p>
            }
        </div>
      </div>
    )
  }
}

export default Items;