import React, { useState } from 'react';
import Letter from './Letter';
import Word from './Word';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import './Game.css';
const words = require('./words');



const AZERTY = ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN'];

const Game = () => {

    const [remainingTries, setRemainingTries] = useState(8);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [foundLetters, setFoundLetters] = useState([]);
    const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)].toUpperCase());
    const [nbRemainingLetters, setNbRemainingLetters] = useState(word.replace(/[^A-Z]/g, '').length);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);

    const setDefaultState = () => {
        setRemainingTries(8);
        setSelectedLetters([]);
        setFoundLetters([]);
        const localWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        setWord(localWord);
        setNbRemainingLetters(localWord.replace(/[^A-Z]/g, '').length);
        setWin(false);
        setLose(false);
    }

    const isVisible = character => {

        if (foundLetters.includes(character)) {
            return true;
        }

        return false;
    }


    // Count the number of occurrences of a character in a word
    const countOccurrences = (character, word) => {
        var count = 0;
        [...word].forEach(c => {
            if (c === character) count++;
        });
        return count;
    }



    const handleLetterClick = (character, selectable) => {
        if (selectable) {
            const occurrences = countOccurrences(character, word);

            // Decrement remaining tries
            // Add character in selected letters
            selectedLetters.push(character);
            setSelectedLetters(selectedLetters);

            // Add character in found letters
            if (word.includes(character)) {
                foundLetters.push(character);
                setFoundLetters(foundLetters);
                setNbRemainingLetters(nbRemainingLetters - occurrences);

                // Check if the user wins
                if (nbRemainingLetters - occurrences === 0) {
                    setWin(true);
                    setFoundLetters([...word]);
                    setSelectedLetters(AZERTY[0].concat(AZERTY[1]).concat(AZERTY[2]));
                }
            }
            else { // The letter is not in the word
                setRemainingTries(remainingTries - 1);

                // Check if the user lost
                if (nbRemainingLetters - occurrences !== 0 && remainingTries - 1 === 0) {
                    setLose(true);
                    setFoundLetters([...word]);
                    setSelectedLetters(AZERTY[0].concat(AZERTY[1]).concat(AZERTY[2]));
                }
            }

        }
        return;
    }

    const replayGame = () => {
        setDefaultState();
    }

    const isSelectable = (character) => {
        if (selectedLetters.includes(character)) {
            return false;
        }

        return true;
    }



    return (
        <div className="game">
            <Link to='/' className="btn-gradient">Retour</Link>
            <h2>Devine le rappeur</h2>
            <Word
                word={word}
                isVisible={isVisible}
            />
            <div className="keyboard">
                {
                    AZERTY.map((keyboardLine, index) => (
                        <div className="keyboardLine" key={index}>
                            {
                                keyboardLine.split('').map((character, index) => (
                                    <Letter
                                        isButton
                                        character={character}
                                        key={index}
                                        index={index}
                                        onClick={handleLetterClick}
                                        selectable={isSelectable(character)}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            {
                lose &&
                <div className="loseMessage">
                    <p>Perdu ! Le rappeur à deviner était {word}.</p>
                    <button onClick={replayGame}>Rejouer</button>
                </div>
            }
            {
                !win && !lose &&
                <h3 className="remainingTries">
                    Tentatives restantes : {remainingTries}
                </h3>
            }
            {
                win &&
                <div className="winMessage">
                    <p>{word} était bien le rappeur à deviner, bravo à toi !</p>
                    <button onClick={replayGame} className="btn-gradient">Rejouer</button>
                </div>
            }
        </div>
    )
};



export default Game;
