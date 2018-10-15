import React, { Component } from 'react';
import './App.css';
import Search from './search';
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
    let searchQuery = Number(this.state.data.id);
    let newQuery = null;
    if (searchQuery === 802) {
      newQuery = 1;
    } else {
      newQuery = Number(this.state.data.id) + 1;
    }
    this.setState({query: newQuery})
    this.search({query: newQuery})
  }

  toggleBackward() {
    let searchQuery = Number(this.state.data.id);
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

    if (sprites !== undefined) {
        spriteSrc = this.state.data.sprites.front_default
        sprite = <img src={spriteSrc} height="125" width="125"/>
        shinySprite = <img src={this.state.data.sprites.front_shiny} height="125" width="125"/>
        spriteButton = <Button type="button" onClick={toggleSprite}>Toggle Sprite Color</Button>
        forwardButton = <Button type="button" onClick={this.toggleForward}>Next pokémon</Button>
        backwardButton = <Button type="button" onClick={this.toggleBackward}>Previous pokémon</Button>
    }

    if (flavorTexts !== undefined) {
      flavorText = this.state.speciesData.flavor_text_entries.map((entry, i) => {
        if (entry.language.name === "en") {
          return (
            <li key={i}> {entry.version.name}: {entry.flavor_text} </li>
          )
        }
      })
      textButton = <Button type="button" onClick={toggleText}>Flavor Text</Button>
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
            {
              (name) 
              ? (
                  <Wrapper>
                    <div className = "App-text">
                      <p>{name}</p>
                      <p>{id}</p>
                    </div>
                    <p id="sprite1"> {sprite} 
                      <br/>
                      <br/>
                    </p>       
                    <div className = "App-text">
                      <p id="sprite2" hidden = "true">
                        { shinySprite }
                        <br/>
                        Shiny
                      </p>
                    </div>
                    <p> {toggleSprite} </p>
                    <p> {spriteButton} </p>
                    <p> {backwardButton} {forwardButton} </p>
                    <div className = "App-text">
                      {
                        evolveFrom
                        ? <p> Evolves from: {evolveFrom} </p>
                        : null
                      }
                    </div>
                    <p> {textButton} </p>
                    <div className = "App-flavor">
                      <p id="flavatext" hidden = "true">
                      {flavorText}
                      </p>
                    </div>
                  </Wrapper>
               ) : <p>{error}</p>
            }
        </div>
      </div>
    )
  }
}

export default App;
