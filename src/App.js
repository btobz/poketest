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
    let id = data.id;
    const sprites = this.state.data.sprites;
    
    let sprite = null
    let spriteSrc = null
    let shinySprite = null
    let spriteButton = null

    const toggleSprite = () => {
      if (document.getElementById('sprite1').hidden === false){
      document.getElementById('sprite1').hidden = true;
      document.getElementById('sprite2').hidden = false;
      } else {
      document.getElementById('sprite2').hidden = true;
      document.getElementById('sprite1').hidden = false;
      }
    }

    if (sprites !== undefined) {
        spriteSrc = this.state.data.sprites.front_default
        sprite = <img src={spriteSrc} height="100" width="100"/>
        shinySprite = <img src={this.state.data.sprites.front_shiny} height="100" width="100"/>
        spriteButton = <button type="button" onClick={toggleSprite}>Toggle Sprite Color</button>
    }
    


    return (
      <div className = "App-component">
      <div className = "App">
        <Search search = {this.search} />
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
        <p>{toggleSprite}</p>
        <p> {spriteButton} </p>
      </div>
      </div>
    )
  }
}

export default App;
