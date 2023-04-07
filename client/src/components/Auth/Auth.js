import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' // the used (useHistory)
import { AUTH } from '../../constants/actionTypes'
import { signup , signin } from '../../actions/auth.actions'
import Input from './Input'
import Icon from './icon'
import { Avatar , Button , Grid , Paper , Typography , Container, TextField} from '@material-ui/core'
// import { GoogleLogin } from 'react-google-login'
import useStyles from '../../styles'
import {  LockOutlined } from '@material-ui/icons'


const Auth = () => {
    const classes = useStyles()
    const initialState = { firstName: '' , lastName: '' , email: '' , password: '' , confirmPassword: ''}

    const [ showPassword  , setShowPassword] = useState(false)
    const [ isSignUp  , setIsSignUp] = useState(false)
    const [ formData , setFormData] = useState(initialState)

    const handleShowPassword = ()=> setShowPassword((prevShowPassword) => !prevShowPassword)
    const dispatch = useDispatch()
    const history = useNavigate() // const history = useHistory()
    
    const handleSubmit = (e)=> {
        e.preventDefault()

        if(isSignUp){
            dispatch(signup(formData , history))
        }else {
            dispatch(signin(formData , history))
        }
    }
    const handleChange = (e)=> {
        setFormData({ ...formData , [e.target.name]: e.target.value})
    }
    const switchMode = ()=> {
        setIsSignUp((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }
    const googleSuccess = async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type: AUTH , data: { result , token } })
            history('/') // history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error)=>{
        console.log(error)
        console.log('Google sign in was unsuccessful , Try again later')
    }
    return (
        <Container component='main' maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                            <Input name='firstname' label='First Name' handleChange={handleChange} autoFocus half />
                            <Input name='lastname' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
                    </Grid>
                    <Button type="submit" variant="contained" fullWidth color='primary' className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        // Google client Id would be pasted beneth
                        clientId = "GOOGLE ID"
                        render={(renderProps)=>(
                            <Button  className={classes.googleButton}  color='primary'  fullWidth  onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'
                            > Google Sign In </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account ? Sign In' : 'Dont have an account ? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    )
}

export default Auth