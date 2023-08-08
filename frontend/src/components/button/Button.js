import React from 'react'
import './Button.css';


const BUTTON_TYPE_CLASSES={
  google:'google-sign-in',
  inverted:'inverted'
}

export default function Button({children, buttonType,...otherProps}) {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
    {...otherProps}
    >
      
     {otherProps.text}</button>
  )
}


// default button

//  inverted button

// google sign-in button

