import React from 'react'
import { foodTypes } from '../../data/data'
import { Link } from 'react-router-dom'
import classes from './foods.module.css'

import { useSelector } from 'react-redux'
import { config } from '../../Constants';
const CLI = config.url;


// main food product type page, click here, navigate to that type food available
const Foods = () => {

  const { token } = useSelector((state) => state.auth)

  
 // check token to see whether login
 // if login react has foodtype files. it shows them
 // click to call api for that type of food product available.
  return (
    <section id="foods" className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Fast food meals we offer</h2>
        <h4 className={classes.subtitle}>Always on time</h4>
        <div className={classes.foods}>


            {token !== null ? foodTypes.map((foodType) => (
              <Link to={`${CLI}/foods/${foodType.name}`} key={foodType.id} className={classes.food}>
                <h4>{foodType.name}</h4>
                <div className={classes.imgContainer}>
                  <img src={foodType.img} alt="" />
                </div>
              </Link>
            )) : <h1 className={classes.noLogin}> Please login to give order! </h1>}

            

        </div>
        
      </div>
    </section>
  )
}

export default Foods


