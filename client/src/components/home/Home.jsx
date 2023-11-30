import React from 'react'
import Hero from '../hero/Hero'
import classes from './home.module.css'

// home component calling hero component
const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Hero />
        
      </div>
    </div>
  )
}

export default Home