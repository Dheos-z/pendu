import React from 'react'
import PropTypes from 'prop-types'
import './Letter.css'



const Letter = ({ character, onClick, visible, selectable, isButton }) => {
  if(isButton) { // It is a button from the alphabet
    return (
      <button disabled={!selectable} className="letter" onClick={() => onClick(character, selectable)}>
          {character}
      </button>
    )
  }
  else { // It is a character from the word to guess
    if([' ', '\''].includes(character)) { // It is a space
      console.log('wesh');
    return <span className="special-char">{character}</span>
    }
    return ( // It a non-space character
    <button className="letter">{visible ? character : '_'}</button>
    )
  }
}

Letter.propTypes = {
  character: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
  selectable: PropTypes.bool,
  isButton: PropTypes.bool
}

export default Letter;
