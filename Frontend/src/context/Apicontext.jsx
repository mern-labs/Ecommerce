import React from 'react'
import { ProviderContext } from './Usecontext'
import Home from '../pages/Home'

const Apicontext = () => {
  return (
    <ProviderContext>
      <Home/>  
    </ProviderContext>
  )
}

export default Apicontext