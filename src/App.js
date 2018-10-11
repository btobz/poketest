import React, { Component } from 'react';
import './App.css';
import Search from './search';
import styled from 'styled-components';

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      speciesData: [],
      error: '',
    };

    this.search = this.search.bind(this);
    this.toggleForward = this.toggleForward.bind(this);
    this.toggleBackward = this.toggleBackward.bind(this);
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
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${query}/`)
      .then(res => res.json())
      .then(res => {
        return res;
      }).then(json => {
        this.setState({
          query: query,
          speciesData: json,
          error: json.Error,
        }, () => {
        });
      }).catch(err => this.setState({
          error: 'missingno',
          speciesData: [],
    }));
  }

  toggleForward() {
    let searchQuery = Number(this.state.query);
    let newQuery = null;
    if (searchQuery === 802) {
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
      newQuery = 802;
    } else {
      newQuery = searchQuery - 1;
    }
    this.setState({query: newQuery});
    this.search({query: newQuery})
  }

render() {
console.log(this.state.data)
console.log(this.state.speciesData)
console.log(this.state.query)

    let data = this.state.data;
    let name = data.name;
    let error = this.state.error;
    let id = data.id;
    const sprites = data.sprites;
    const flavorTexts = this.state.speciesData.flavor_text_entries;
    let evolvesFrom = this.state.speciesData.evolves_from_species;
    let sprite = null;
    let spriteSrc = null;
    let shinySprite = null;
    let spriteButton = null;
    let flavorText = [];
    let evolveFrom = null;
    let textButton = null;
    let forwardButton = null;
    let backwardButton = null;

    const toggleSprite = () => {
      if (document.getElementById('sprite1').hidden === false){
      document.getElementById('sprite1').hidden = true;
      document.getElementById('sprite2').hidden = false;
      } else {
      document.getElementById('sprite2').hidden = true;
      document.getElementById('sprite1').hidden = false;
      }
    }

    const toggleText = () => {
      if (document.getElementById('flavatext').hidden === false){
        document.getElementById('flavatext').hidden = true;
      } else {
        document.getElementById('flavatext').hidden = false;
      }
    }

    const Wrapper = styled.section`
      padding: 4em;
      background: papayawhip;
    `;

    if (sprites !== undefined) {
        spriteSrc = this.state.data.sprites.front_default
        sprite = <img src={spriteSrc} height="100" width="100"/>
        shinySprite = <img src={this.state.data.sprites.front_shiny} height="100" width="100"/>
        spriteButton = <button type="button" onClick={toggleSprite}>Toggle Sprite Color</button>
        forwardButton = <button type="button" onClick={this.toggleForward}>Next pokeman</button>
        backwardButton = <button type="button" onClick={this.toggleBackward}>Previous pokeman</button>
    }

    if (flavorTexts !== undefined) {
      flavorText = this.state.speciesData.flavor_text_entries.map((entry, i) => {
        if (entry.language.name === "en") {
          return (
            <li key={i}> {entry.version.name}: {entry.flavor_text} </li>
          )
        }
      })
      textButton = <button type="button" onClick={toggleText}>Flavor Text</button>
        if (evolvesFrom !== null) {
          evolveFrom = this.state.speciesData.evolves_from_species.name
        }
    }

    return (
      <div className = "App-component">
        <div className = "App">
          <div className = "App-search">
            <Search search = {this.search} />
          </div>
          <Wrapper>
            <p>{name}</p>
            <p>{id}</p>
            <p>{error}</p>
            <p id="sprite1"> {sprite} 
              <br/>
              <br/>
            </p>       
            <p id="sprite2" hidden = "true">
              { shinySprite }
              <br/>
              Shiny
            </p>
            <p> {toggleSprite} </p>
            <p> {spriteButton} </p>
            <p> {backwardButton} {forwardButton} </p>
            {
            evolveFrom
            ? <p> Evolves from: {evolveFrom} </p>
            : null
            }
            <p> {textButton} </p>
            <p id="flavatext" hidden = "true">
            {flavorText}
            </p>
          </Wrapper>
        </div>
      </div>
    )
  }
}

export default App;
