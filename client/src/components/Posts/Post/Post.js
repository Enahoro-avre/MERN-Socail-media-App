import React, { useState } from 'react'
import { Card, CardActions , CardContent ,  CardMedia , Button , Typography  , ButtonBase} from '@material-ui/core'
import { ThumbDownAlt , Delete , MoreHoriz } from '@material-ui/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import useStyles from './post.styles'
import { deletePost , likePost } from '../../../actions/posts.actions'
import { useHistory } from 'react-router-dom'


export const Post = ({post , setcurrentId}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [ likes , setLikes] = useState(post?.likes)

  const userId = user?.result.googleId || user?.result?._id
  const hasLikedPost = post.likes.find((like)=> like === userId)

  const handleLike = async()=> {
    dispatch(likePost(post?._id))

    if(hasLikedPost){
        setLikes(post?.likes?.filter((id)=> id !== userId))
    } else {
        setLikes([...posts.likes , userId ])
    }
  }

  const Likes = ()=> {
    if(likes.length > 0) {
      return post.likes.find((like)=> like === userId)
      ? (
        <><ThumbDownAlt fontSize='small'/>&nbsp;{likes?.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
      ) : (
        <><ThumbDownAlt fontSize='small'/>&nbsp;{likes?.length} {likes.length === 1 ? 'Like' : 'Likes'}`</>
      )
    }

    return <><ThumbDownAlt fontSize='small'/>&nbsp;Like</>
  }

  const openPost = ()=> history.push(`/posts/${post._id}`)
  
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardActions} onClick={openPost}>

      <CardMedia className={classes.media} image={post?.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post?.name}</Typography>
        <Typography variant='body2'>{moment(post?.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{color:'white'}} size="small" onClick={()=>setcurrentId(post?._id)}><MoreHoriz fontSize='default' /></Button>
        </div>
      )}
      
      <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post?.tags.map((tag)=> `#${tag} `)} </Typography>
      </div>
        <Typography className={classes.title} variant='h5' gutterBottom>{post?.title}</Typography>
      <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>{post?.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
          <Button size='small' color='primary' disabled={!user?.result} onClick={()=>{handleLike}}>
            <ThumbDownAlt fontSize='small'/>
            {/* &nbsp; Like &nbsp;
            {post?.likeCount} */}
            <Likes/>
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size='small' color='primary' onClick={()=>{dispatch(deletePost(post?._id))}}>
              <Delete fontSize='small'/>
              Delete
          </Button>
          )}
          
      </CardActions>
    </Card>
  
  ) 
}

export default Post;