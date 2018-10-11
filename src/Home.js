import React, { Component } from "react";
import pokeprof from './pokeprof.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Hello there!</h2>
        <p>Welcome to the world of CSC 358 - Open Source Development! My name is Brady! This website is built for Leon Tabak, better known as the pokémon Prof! This world is inhabited by creatures called pokémon! On this web app, you are able to search pokémon by name or by number! </p>
        <div className="pokeprof">
          <img src={pokeprof} />
        </div>
      </div>
    );
  }
}
 
export default Home;