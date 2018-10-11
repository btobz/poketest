import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import App from "./App";
import Misc from "./Misc";
import Items from "./Items";

class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
            <h1>PokéTest</h1>
            <ul className="header">
                <li><NavLink exact to="/"> Home </NavLink></li>
                <li><NavLink to="/pokemans"> Pokémon </NavLink></li>
                <li><NavLink to="/misc"> Misc </NavLink></li>
                <li><NavLink to="/items"> Items </NavLink></li>
            </ul>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/pokemans" component={App}/>
                <Route path="/misc" component={Misc}/>
                <Route path="/items" component={Items}/>
            </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;