import React, { useRef, useState } from 'react'
import { Typography , TextField , Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyle from './styles'

import { commentPost } from '../../actions/posts.actions'


const CommentSection = ({ post }) => {
  const dispatch = useDispatch()
  const classes = useStyle()
  const [ comments , setComments] = useState(post?.comments)
  const [ comment , setComment] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))
  const commentsRef = useRef()

  const handleClick = async ()=> {
    const finalComment = `${user.result.name}: ${comment}`

    const newComments = dispatch(commentPost(finalComment , post._id))
    
    setComments(newComment)
    setComment('')

    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
              <Typography gutterBottom variant='h6'>Comments</Typography>
              {comments?.map((c , i)=>(
                  <Typography key={i} gutterBottom variant='subtitle1'>
                      <strong>{c.split(': ')[0]}</strong>
                      {c.split(':')[1]}
                  </Typography>
              ))}
              <div ref={commentsRef}/>
          </div>
            {user?.result?.name && (
          <div style={{ margin: '70%'}}>
            <Typography gutterBottom variant='h6'>Write a comment</Typography>
            <TextField 
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={((e)=> setComment(e.target.value))}
            />
            <Button style={{ marginTop: '10px'}} variant="contained" fullWidth disabled={!comment} color='primary' onClick={handleClick}>

            </Button>
          </div>
            )}
      </div>
    </div>
  )
}

export default CommentSection