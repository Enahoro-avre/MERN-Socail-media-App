import React , { useState , useEffect} from 'react'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'
import { Container , Grow , Grid , Paper , AppBar , TextField, Button } from '@material-ui/core'
import { useHistory , useLocation} from 'react-router-dom'
import ChipInput from '@material-ui-chip-input'
import { useDispatch } from 'react-redux'
import { getPosts  , getPostsBySearch } from '../../actions/posts.actions'
import useStyles from './Home.styles'


function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const [currentId , setcurrentId] = useState(null) 
    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')   
    const [ search , setSearch] = useState('')
    const [ tags , setTags] = useState([])



    // useEffect(()=>{ 
    //     dispatch(getPosts())
    // },[currentId , dispatch])

    const searchPost = ()=> {
        if(search.trim() || tags ){
            dispatch(getPostsBySearch({ search , tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else
            history.push('/')
    }

    const handleKeyPress = (e)=>{
        if (e.KeyCode === 13){
            // search post
            searchPost()
        }
    }

    const handleAdd = (tags)=> setTags([...tags , tag])
    const handleDelete = (tagsToDelete)=> setTags(tags.filter((tag) => tag !== tagsToDelete))

    return (
    <Grow in>
        <Container maxWidth='xl'>
            <Grid container flexDirectiob='column reverse'  justify='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setcurrentId={setcurrentId}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position='static' color='inherit' >
                            <TextField 
                                name='search' 
                                variant='outlined'
                                label='Search Memories'
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e)=> setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
                        </AppBar>
                    <Form currentId={currentId} setcurrentId={setcurrentId}/>
                    {(!searchQuery && !tags) && (
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page}/>
                        </Paper>
                    )}
                
                </Grid>
            </Grid>
        </Container>
    </Grow>
)
}

export default Home