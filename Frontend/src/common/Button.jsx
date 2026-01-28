import React from 'react'

const Button = ({text,property,btn}) => {
  return (
    <div className={`${property}`}>
      <button className={`${btn}`}>{text}</button>
    </div>
  )
}

export default Button