import actionsType from './actionsType'
import * as apis from '../../services'



export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories()
        if (response?.data.err === 0) {
            dispatch({
                type: actionsType.GET_CATEGORIES,
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionsType.GET_CATEGORIES,
                msg: response.data.msg,
                categories: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_CATEGORIES,
            categories: null
        })
    }
}
export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices()
        if (response?.data.err === 0) {
            dispatch({
                type: actionsType.GET_PRICES,
                prices: response.data.response.sort((a, b) => { return +a.order - +b.order }),
                msg: ''
            })
        } else {
            dispatch({
                type: actionsType.GET_PRICES,
                msg: response.data.msg,
                prices: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_PRICES,
            prices: null,
            msg: error
        })
    }

}
export const getAreas = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAreas()
        if (response?.data.err === 0) {
            dispatch({
                type: actionsType.GET_AREAS,
                areas: response.data.response.sort((a, b) => { return +a.order - +b.order }),
                msg: ''
            })
        } else {
            dispatch({
                type: actionsType.GET_AREAS,
                msg: response.data.msg,
                areas: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_AREAS,
            areas: null,
            msg: error
        })
    }
}
export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProvinces()
        if (response?.data.err === 0) {
            dispatch({
                type: actionsType.GET_PROVINCES,
                provinces: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionsType.GET_PROVINCES,
                msg: response.data.msg,
                provinces: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionsType.GET_PROVINCES,
            provinces: null,
            msg: ''
        })
    }
}