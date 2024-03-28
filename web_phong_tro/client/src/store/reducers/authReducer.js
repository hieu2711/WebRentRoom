import actionsType from "../actions/actionsType";
const initState = {
    isLoggedIn : false,
    token: null,
    msg: '',
    update:false
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionsType.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data || null
            }
            case actionsType.REGISTER_FAIL:
                return {
                    ...state,
                    isLoggedIn: false,
                    msg: action.data,
                    token: null
                
                }
                case actionsType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: ''
            }
            case actionsType.LOGIN_FAIL:
                return {
                    ...state,
                    isLoggedIn: false,
                    msg: action.data,
                    token: null,
                    update:!state.update
                }
                case actionsType.LOGOUT:
                    return {
                        ...state,
                        isLoggedIn: false,
                        token: null,
                        msg: ''
                    }
        default:
            return state;
    }
}
export default authReducer;