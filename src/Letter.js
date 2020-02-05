import React from 'react'
import PropTypes from 'prop-types'
import './Letter.css'



const Letter = ({ character, onClick, visible, selectable, isButton }) => {
  if(isButton) {
    return (
      <button disabled={!selectable} className="letter" onClick={() => onClick(character, selectable)}>
          {character}
      </button>
    )
  }
  else {
    return (
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
