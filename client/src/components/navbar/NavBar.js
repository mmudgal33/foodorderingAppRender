import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './navbar.module.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'

// AiOutlineUser,



const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { products } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { username } = useSelector((state) => state.user)
    // const {user} = useSelector((state) => state.auth)
    //{user ==null ? `IN` : `OUT`}



    // window.onscroll = () => {
    //   setIsScrolled(window.pageYOffset === 0 ? false : true)
    //   return () => (window.onscroll = null)
    // }

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <nav class="navbar navbar-inverse">
            {/* <div class="container-fluid"> */}
            <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
                <div className={classes.wrapper}>
                    <div class="navbar-header">
                        <div className={classes.left}>
                            <Link to='/' className={classes.title}>
                                HUNG
                            </Link>
                        </div>
                    </div>
                    <ul class="nav navbar-nav">


                        <div className={classes.center}>
                            <ul className={classes.list}>
                                <li className={classes.listItem}>
                                    <Link to="/">Home</Link>
                                </li>

                                <li className={classes.listItem}>
                                    <Link to="/foods">Foods</Link>
                                </li>
                                <li className={classes.listItem}>
                                    <Link to='/create'>Create</Link>
                                </li>
                            </ul>
                        </div>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <div className={classes.right}>
                            <Link to='/cart' className={classes.cartContainer}>
                                <AiOutlineShoppingCart className={classes.cartIcon} />
                                <div className={classes.cartQuantity}>{products.length}</div>
                            </Link>
                            <button onClick={handleLogout} className={classes.logout}>LOGOUT</button>
                        </div>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Navbar











































