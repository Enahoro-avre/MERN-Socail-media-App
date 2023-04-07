import React, { useEffect } from 'react'
import CommentSection from './CommentSection'
import { Paper , Typography , CircularProgress , Divider } from '@material-ui/core'
import { useDispatch , useSelector } from 'react-redux'
import moment from 'moment'
import { useParams , useHistory } from 'react-router-dom'

import useStyles from './postDetails.styles'
import { getPost  , getPostsBySearch} from '../../actions/posts.actions'


const PostDetails = () => {
  const { post , isLoading , posts} = useSelector((state)=> state.posts)
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()
  const { id } = useParams()

  useEffect(()=> {
    dispatch(getPost(id))
  },[id])

  useEffect(()=> {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none' , tags: post?.tags.join(',')}))
  }
  },[post])

  if (!post) return null
  
  if (isLoading){
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
  )}

  const recommendedPosts = posts.filter(({_id})=> _id !== post._id)

  const openPost = (_id)=> history.push(`/posts/${post._id}`)
  

  return (
    <Paper style={{ padding: '20px' , borderRadius:'15px' }} elevation={6}>
      <title>JSX of post details</title>

    <CommentSection post={post}/>

      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>You may also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({ title , message , name , likes , selectedFile , _id })=>(
                  <div style={{ margin: '20px', cursor: 'pointer'}} onClick={()=> openPost(_id)} key={_id}>
                      <Typography gutterBottom variant='h6'>{title}</Typography>
                      <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                      <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                      <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                      <img src={selectedFile} width='200px'/>
                  </div>
              ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails