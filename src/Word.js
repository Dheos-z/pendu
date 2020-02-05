import React from 'react'
import PropTypes from 'prop-types'
import Letter from './Letter';
import './Word.css'



const Word = ({ word, isVisible }) => {
    // If the Word is composed of multiple words
    // const seperatedWords = word.split(' ');
    
    const letters = word.split('').map((character, index) => (
        <Letter
            isButton={false}
            character={character}
            key={index}
            visible={isVisible(character)}
        />
    ));
    return letters;
}

Word.propTypes = {
    word: PropTypes.string.isRequired,
    isVisible: PropTypes.func.isRequired
}

export default Word;
