import React, { Component } from 'react';
import './App.css';
import Letter from './Letter';
import tmax from './tmax.gif';
const words = require('./words');

const defaultState = () => {
  const word = words[Math.floor(Math.random() * words.length)].toUpperCase();

  return {
    remainingTries: 8,
    selectedLetters: [],
    foundLetters: [],
    word,
    nbRemainingLetters: word.length,
    win: false,
    lose: false
  }
};
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class App extends Component {
  state = defaultState();

  // Count the number of occurrences of a character in a word
  countOccurrences = (character, word) => {
    var count=0;
    [...word].forEach(c => {
      if(c===character) count++;
    });
    return count;
  }

  handleLetterClick = (character, selectable) => {
    if (selectable) {
      const { selectedLetters, foundLetters, nbRemainingLetters, word, remainingTries } = this.state;
      const occurrences = this.countOccurrences(character, word);

      // Decrement remaining tries
      // Add character in selected letters
      this.setState({ selectedLetters: [...selectedLetters, character] });

      // Add character in found letters
      if (word.includes(character)) {
        this.setState({ foundLetters: [...foundLetters, character], nbRemainingLetters: nbRemainingLetters-occurrences });

        // Check if the user wins
        if (nbRemainingLetters-occurrences === 0) {
          this.setState({ win: true, foundLetters: [...word], selectedLetters: [...ALPHABET] });
        }
      }
      else {
        this.setState({remainingTries: remainingTries-1});
      }
      
      // Check if the user lost
      if(nbRemainingLetters-occurrences !== 0 && this.state.remainingTries-1 === 0) {
        this.setState({lose: true, foundLetters: [...word], selectedLetters: [...ALPHABET]});
      }
    }
    return;
  }

  isVisible(character) {
    const { foundLetters } = this.state;

    if (foundLetters.includes(character)) {
      return true;
    }

    return false;
  }

  isSelectable = (character) => {
    const { selectedLetters } = this.state;

    if (selectedLetters.includes(character)) {
      return false;
    }

    return true;
  }

  replayGame = () => {
    this.setState(defaultState());
  }

  render() {
    const { word } = this.state;

    return (
      <div className="pendu">
        <h1>Pendu en Y</h1>
        <img className='tmax' src={tmax} alt="T-max en Y"/>
        <h2>Devine le rappeur</h2>
        <div className="word">
          {
            word.split('').map((character, index) => (
              <Letter
                isButton={false}
                character={character}
                key={index}
                onClick={this.handleLetterClick}
                visible={this.isVisible(character)}
              />
            ))
          }
        </div>
        <br />
        <div className="alphabet">
          {
            ALPHABET.split('').map((character, index) => (
              <Letter
                isButton
                character={character}
                key={index}
                index={index}
                onClick={this.handleLetterClick}
                selectable={this.isSelectable(character)}
              />
            ))
          }
        </div>
        {
          this.state.lose &&
          <div className="loseMessage">
            <p>Perdu ! Le rappeur à deviner était {word}.</p>
            <button onClick={this.replayGame}>Rejouer</button>
          </div>
        }
        {
          !this.state.win && !this.state.lose &&
          <div className="remainingTries">
            Tentatives restantes : {this.state.remainingTries}
          </div>
        }
        {
          this.state.win &&
          <div className="winMessage">
            <p>{word} était bien le rappeur à deviner, bravo à toi !</p>
            <button onClick={this.replayGame}>Rejouer</button>
          </div>
        }
      </div>
    )
  }
}

export default App;
