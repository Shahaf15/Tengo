import React, { useReducer, useContext } from "react";
import axios from 'axios';

import reducer from "./reducer";
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_ADV_BEGIN,
    CREATE_ADV_SUCCESS,
    CREATE_ADV_ERROR,
    GET_ADVS_BEGIN,
    GET_ADVS_SUCCESS,
    SET_EDIT_ADV,
    DELETE_ADV_BEGIN,
    EDIT_ADV_BEGIN,
    EDIT_ADV_SUCCESS,
    EDIT_ADV_ERROR
} from "./actions";


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    editAdvId: '',
    title: '',
    foodType: 'Homemade',
    details: '',
    advLocation: userLocation || '',
    foodTypeOptions: ['Homemade', 'Vegetables', 'Other'],
    statusOptions: ['Open', 'Close '],
    status: 'Open',
    advs: [],
    totalAdvs: 0,
    numOfPages: 1,
    page: 1
}

const AppContext = React.createContext()


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    //axios
    const authFetch = axios.create({
        baseURL: '/api/v1',
    });

    // request
    authFetch.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${state.token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    //response
    authFetch.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(error);
    });



    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 2000)
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location
                },
            })
            console.log(user, location)
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const { data } = await axios.post('/api/v1/auth/login', currentUser)
            const { user, token, location } = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location
                },
            })
            console.log(user, location)
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }
    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)

            const { user, location, token } = data

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token }
            })
            addUserToLocalStorage({ user, location, token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg }
                })
            }
        }
        clearAlert()
    }

    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const createAdv = async () => {
        dispatch({ type: CREATE_ADV_BEGIN })
        try {
            const { title, foodType, details, advLocation, status } = state
            await authFetch.post('/advs', {
                title,
                foodType,
                details,
                advLocation,
                status
            })
            dispatch({ type: CREATE_ADV_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({ type: CREATE_ADV_ERROR, payload: { msg: error.response.data.msg } })

        }
        clearAlert()
    }

    const getAdvs = async () => {
        let url = `/advs`
        dispatch({ type: GET_ADVS_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { advs, totalAdvs, numOfPages } = data
            dispatch({
                type: GET_ADVS_SUCCESS,
                payload: {
                    advs,
                    totalAdvs,
                    numOfPages,
                },
            })

        } catch (error) {
            console.log(error.response);
        }
        clearAlert()
    }

    const setEditAdv = (id) => {
        dispatch({ type: SET_EDIT_ADV, payload: { id } })
    }

    const editAdv = () => {
      dispatch({type: EDIT_ADV_BEGIN})
      try {
        
      } catch (error) {
        
      }
    }

    const deleteAdv = async (advId) => {
        dispatch({type: DELETE_ADV_BEGIN})
        try {
            await authFetch.delete(`/advs/${advId}`)
            getAdvs()
        } catch (error) {
            console.log(error.response);
            //logoutUser()
        }
    }


    return <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createAdv, getAdvs, setEditAdv, deleteAdv, editAdv }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }