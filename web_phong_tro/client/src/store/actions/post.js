
import { apiGetPosts,apiGetPostsLimit,apiGetNewPosts } from '../../services/post'
import actionsType from './actionsType'

export const getPosts =  () => async (dispatch) => {
    try {
        const response = await apiGetPosts() //callAPI
        if(response?.data.err === 0){
            dispatch({
                type: actionsType.GET_POSTS,
                posts: response.data.response
            })
        }
        else{
            dispatch({
                type: actionsType.GET_POSTS,
                msg: response.data.msg
            })  
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_POSTS,
            post: null
        })
    }
}

export const getPostsLimit =  (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit(query) //callAPI
        if(response?.data.err === 0){
            dispatch({
                type: actionsType.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count,
            })
        }
        else{
            dispatch({
                type: actionsType.GET_POSTS_LIMIT,
                msg: response.data.msg
            })  
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_POSTS,
            post: null
        })
    }
}

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionsType.GET_NEW_POST,
                newPosts: response.data.response,
            })
        } else {
            dispatch({
                type: actionsType.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionsType.GET_NEW_POST,
            newPosts: null
        })
    }
}