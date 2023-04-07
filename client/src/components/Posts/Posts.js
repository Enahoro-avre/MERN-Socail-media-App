import React from 'react'
import { Grid , CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import { useSelector } from 'react-redux'
import useStyles from './posts.styles'

// A hook to access the redux store's state. This hook takes a selector function as an argument. The selector is called with the store state.

export const Posts = ({ setcurrentId}) => {
  const { posts , isLoading } = useSelector((state)=> state.posts)
  const classes = useStyles()

  if (!posts.length && !isLoading) return 'No posts'
  console.log(posts)
  return (
          
      !posts?.length ? <CircularProgress/> : (
        <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
            {posts.map((post)=> (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setcurrentId={setcurrentId}/>
              </Grid>
            ))}
        </Grid>
      )


  )
}


export default Posts;