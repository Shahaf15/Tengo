import { initialState } from "./appContext";
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

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values!', }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            advLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Created! Redirecting...'
        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            advLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login successful! Redirecting...'
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: null,
            jobLocation: null,
        }
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            advLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!'
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        }
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editAdvId: '',
            title: '',
            foodType: 'Homemade',
            details: '',
            advLocation: state.userLocation || '',
            status: 'Open'
        }
        return {
            ...state,
            ...initialState,
        }
    }
    if (action.type === CREATE_ADV_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === CREATE_ADV_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created!',
        }
    }

    if (action.type === CREATE_ADV_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }

    if (action.type === GET_ADVS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }

    if (action.type === GET_ADVS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            advs: action.payload.advs,
            totalAdvs: action.payload.totalAdvs,
            numOfPages: action.payload.numOfPages
        }
    }

    if (action.type === SET_EDIT_ADV) {
        const adv = state.advs.find((adv) => adv._id === action.payload.id)
        const { _id, title, advLocation, status, details, foodType } = adv
        return {
            ...state,
            isEditing: true,
            editAdvId: _id,
            title,
            advLocation,
            status,
            details,
            foodType,
        }
    }

    if (action.type === DELETE_ADV_BEGIN) {
        return { ...state, isLoading: true }
    }

    throw new Error(`no such action : ${action.type}`);
}

export default reducer