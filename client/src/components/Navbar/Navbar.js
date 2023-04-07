import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate , useLocation } from 'react-router-dom' // They used useHistory
import { Typography , AppBar, Toolbar, Avatar, Button , Link } from '@material-ui/core'
// import { Link } from 'react-router-dom'
import useStyles from './Navbar.styles'
import memoriesText from '../../images/blue.jpg'
import memoriesLogo from '../../images/memories.png'
import { LOGOUT } from '../../constants/actionTypes'

const Navbar = () => {
    const classes = useStyles()
    const history = useNavigate() // const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const getUser = JSON.parse(localStorage.getItem('profile'))
    const [ user , setUser] = useState(getUser)

    const logOut = () =>{
        dispatch({ type: LOGOUT })
        history('/auth')  // history.push('/') 

        setUser(null)
    }

    useEffect(()=>{
        // JWT...
        const token = user?.token;

        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logOut()
        }

        setUser(getUser)
    },[location])

    return (
    <div>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer}>
                {/* The LINK tag below uses react-router-dom */}
                {/* <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
                    Memories
                </Typography> */}
                <img src={memoriesText} alt='icon' height='45px'/>
                <img  className={classes.image} src={memoriesLogo} alt='memories' height='40px'/>
            </Link>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user?.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logOut}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign in</Button>
                )}

            </Toolbar>
        </AppBar>
    </div>
)
}

export default Navbar