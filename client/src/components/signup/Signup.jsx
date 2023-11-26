import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './signup.module.css'
import img from '../../assets/womaneating.jpg'
import { register } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import { config } from '../../Constants';
const URL = config.api;





const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    
    try {
      // const values = JSON.stringify({ username, email, password })
      // console.log(values)
      // axios.post('http://localhost:5000/auth/register', values)

      // const res = await fetch(`http://localhost:5000/auth/register`, {
        const res = await fetch(`${URL}/auth/register`, {
      // const res = await fetch(`/auth/register`, {
        headers: {
          "Content-Type": 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ username, email, password })
      })

      const data = await res.json()
      console.log(data)
      dispatch(register(data))
      navigate('/')
      // console.log(data)
      

    } catch (error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }


  


  


  return (
    
    <div className={classes.signUpContainer}>
      <div className={classes.signUpWrapper}>
        <div className={classes.signUpLeftSide}>
          <img src={img} alt="" className={classes.leftImg} />
        </div>
        <div className={classes.signUpRightSide}>
          <h2 className={classes.title}>Sign Up</h2>
          <form onSubmit={handleSignup} className={classes.signUpForm}>
            <input type="text" placeholder="Type username" onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Type email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Type password" onChange={(e) => setPassword(e.target.value)} />
            <button className={classes.submitBtn}>Sign Up</button>
            
            <p>Already have an account? <Link to='/login'>Login</Link></p>
            {/* <p>Already have an account? <a href="/login">Login</a></p> */}
            {/* <button onclick="window.location.href = '/login';">Login</button> */}

          </form>
          
          {
            error && (
              <div className={classes.errorMessage}>
                Wrong credentials! Try different ones.
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Signup