import React from 'react'

const Button = ({text,property}) => {
  return (
    <div className={`${property}`}>
      <button>{text}</button>
    </div>
  )
}

export default Button