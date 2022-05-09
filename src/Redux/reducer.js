import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    PROFILE_FAILURE,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    REGISTERATION_FAILURE,
    REGISTERATION_REQUEST,
    REGISTERATION_SUCCESS,
    GET_TODOS_SUCCESS,
    GET_TODOS_REQUEST,
    GET_TODOS_FAILURE,
    SET_TODOS_FAILURE,
    SET_TODOS_SUCCESS,
    SET_TODOS_REQUEST,
    EDIT_TODOS_REQUEST,
    EDIT_TODOS_SUCCESS,
    EDIT_TODOS_FAILURE
} from "./actionTypes"

const initState = {
    isRegistered: false,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    token: "",
    userData: {},
    todos: [],
    username: ""
}
export const reducer = (state = initState, {
    type,
    payload
}) => {
    switch (type) {
        case REGISTERATION_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case REGISTERATION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isRegistered: true
            }
        }
        case REGISTERATION_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                token: payload !== undefined ? payload.token : "",
                username: payload.username,
                isLoading: false,
                isError: false,
                isLoggedIn: true
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case PROFILE_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case PROFILE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                userData: payload
            }
        }
        case PROFILE_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isLoggedIn: false,
                userData: {},
                token: ""
            }
        }
        case GET_TODOS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case GET_TODOS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                todos: payload
            }
        }
        case GET_TODOS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case SET_TODOS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case SET_TODOS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false
            }
        }
        case SET_TODOS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        case EDIT_TODOS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case EDIT_TODOS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false
            }
        }
        case EDIT_TODOS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default:
            return state
    }
}