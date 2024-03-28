import { apiRegister,apiLogin } from '../../services/auth'
import actionsType from './actionsType'

export const register =  (payload) =>async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        if(response?.data.err === 0){
            dispatch({
                type: actionsType.REGISTER_SUCCESS,
                data: response.data.token
            })
        }
        else{
            dispatch({
                type: actionsType.REGISTER_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.REGISTER_FAIL,
            data: null
        })
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionsType.LOGIN_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionsType.LOGIN_FAIL,
                data: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionsType.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionsType.LOGOUT
})