import React, { Component } from 'react';
import './App.css';
import tmax from '../assets/tmax.gif';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';





class App extends Component {


  render() {

    return (
      <div className="App">
        <header>
          <h1>PENDU EN Y</h1>
          <img className='tmax' src={tmax} alt="T-max en Y" />
        </header>
        <br/>
        <br/>
        <h3>Bienvenue sur PENDU EN Y, le jeu du pendu où il faut deviner un rappeur/chanteur francais!</h3>
        <Link to='/game' className="btn-gradient">Jouer</Link>
      </div>
    )
  }
}

export default App;
