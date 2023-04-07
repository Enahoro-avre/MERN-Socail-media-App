import React from 'react'
import { TextField ,  InputAdornment , IconButton , Grid   } from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({name , label , autoFocus , type , handleChange, handleShowPassword, half }) => {
    return (
    <Grid item={12} sm={half ? 6 : 12}>
            <TextField
            name={name}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            onChange={handleChange}
            InputProps = {name === 'password' ? {
                endAdornment : (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : null} 

            />
        
    </Grid>
    )
}

export default Input