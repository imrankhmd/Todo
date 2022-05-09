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
    GET_TODOS_FAILURE,
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    SET_TODOS_FAILURE,
    SET_TODOS_REQUEST,
    SET_TODOS_SUCCESS,
    EDIT_TODOS_REQUEST,
    EDIT_TODOS_SUCCESS,
    EDIT_TODOS_FAILURE
} from "./actionTypes";

import axios from "axios";

export const registrationRequest = () => {
    return {
        type: REGISTERATION_REQUEST
    }
}
export const registrationSuccess = (response) => {
    return {
        type: REGISTERATION_SUCCESS
    }
}
export const registrationFailure = (payload) => {
    return {
        type: REGISTERATION_FAILURE,
        payload: {
            error: payload
        }
    }
}
export const registration = ({
    name,
    email,
    password,
    username,
    mobile,
    description
}) => (dispatch) => {
    dispatch(registrationRequest());
    return axios.post("https://masai-api-mocker.herokuapp.com/auth/register", {
        name,
        email,
        password,
        username,
        mobile,
        description
    }).then(res => {
        dispatch(registrationSuccess(res.data));
    }).catch(error => dispatch(registrationFailure(error)));
}
export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}
export const loginSuccess = (response, username) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token: response.token,
            username: username
        }
    }
}
export const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload: {
            error: payload
        }
    }
}
export const login = ({
    password,
    username
}) => (dispatch) => {
    dispatch(loginRequest());
    return axios.post("https://masai-api-mocker.herokuapp.com/auth/login", {
        password,
        username
    }).then(res => {
        dispatch(loginSuccess(res.data, username));
        return {
            success: true
        }
    }).catch(error => {
        console.log(error);
        dispatch(loginFailure(error.message))
    });
}
export const profileRequest = () => {
    return {
        type: PROFILE_REQUEST
    }
}
export const profileSuccess = (response) => {
    return {
        type: PROFILE_SUCCESS,
        payload: response
    }
}
export const profileFailure = (payload) => {
    return {
        type: PROFILE_FAILURE,
        payload: {
            error: payload
        }
    }
}
export const getProfile = ({
    username,
    token
}) => (dispatch) => {
    dispatch(profileRequest());
    return axios.get("https://masai-api-mocker.herokuapp.com/user/" + username, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch(profileSuccess(res.data));
            return {
                success: true
            }
        }).catch(error => dispatch(profileFailure(error.message)));
}
export const logout = () => {
    return {
        type: LOGOUT
    }
}
export const getTodosRequest = () => {
    return {
        type: GET_TODOS_REQUEST
    }
}
export const getTodosSuccess = (payload) => {
    return {
        type: GET_TODOS_SUCCESS,
        payload
    }
}
export const getTodosFailure = () => {
    return {
        type: GET_TODOS_FAILURE
    }
}
export const getTodos = () => async dispatch => {
    dispatch(getTodosRequest());
    try {
        const res = await axios.get("https://appointments-react-app.herokuapp.com/todos");
        return dispatch(getTodosSuccess(res.data));
    } catch (error) {
        return dispatch(getTodosFailure(error));
    }
}
export const setTodosRequest = () => {
    return {
        type: SET_TODOS_REQUEST
    }
}
export const setTodosSuccess = (payload) => {
    return {
        type: SET_TODOS_SUCCESS
    }
}
export const setTodosFailure = () => {
    return {
        type: SET_TODOS_FAILURE
    }
}
export const setTodos = (payload) => dispatch => {
    dispatch(setTodosRequest());
    return axios.post("https://appointments-react-app.herokuapp.com/todos", payload)
        .then(res => {
            dispatch(setTodosSuccess(res.data));
            return {
                success: true
            }
        })
        .catch(error => dispatch(setTodosFailure(error)))
}
export const editTodosRequest = () => {
    return {
        type: EDIT_TODOS_REQUEST
    }
}
export const editTodosSuccess = (payload) => {
    return {
        type: EDIT_TODOS_SUCCESS
    }
}
export const editTodosFailure = () => {
    return {
        type: EDIT_TODOS_FAILURE
    }
}
export const editTodos = (id, payload) => dispatch => {
    dispatch(editTodosRequest());
    return axios.patch("https://appointments-react-app.herokuapp.com/todos/" + id, payload)
        .then(res => {
            dispatch(editTodosSuccess(res.data));
            return {
                success: true
            }
        })
        .catch(error => dispatch(editTodosFailure(error)))
}