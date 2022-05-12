import React from 'react'
import './Button.css'

function Link(props) {
  return (
    <button onClick={props.onClick} className='link-btn'>{props.linkText}</button>
  )
}

export default Link