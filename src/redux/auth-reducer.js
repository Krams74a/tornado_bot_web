import { authAPI } from "../api/api"
import {decodeToken} from "react-jwt"
import { getLists } from "./lists-reducer"

const SET_LOGGED_USER_DATA = "auth-reducer/SET_LOGGED_USER_DATA"
const SET_IS_AUTH = "auth-reducer/SET_IS_AUTH"

let initialState = {
    loggedUserInfo: {
        username: "",
        firstName: "",
        lastName: "",
        telegramId: 0,
        role: ""
    },
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_USER_DATA:
            return {
                ...state,
                loggedUserInfo: {
                    username: action.userData.username,
                    firstName: action.userData.firstName,
                    lastName: action.userData.lastName,
                    telegramId: action.userData.telegramId,
                    role: action.userData.role
                }
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.booleanValue
            }
        default:
            return state
    }
}

export const loginSuccess = () => ({type: SET_LOGGED_USER_DATA})
export const setLoggedUserData = (userData) => ({type: SET_LOGGED_USER_DATA, userData})
export const setIsAuth = (booleanValue) => ({type: SET_IS_AUTH, booleanValue})

export const login = (username, password) => async (dispatch) => {
    let data = await authAPI.login(username, password)
    if (!data.status) {
        localStorage.setItem("token", data.token)
        const myDecodedToken = decodeToken(data.token)
        dispatch(setIsAuth(true))
        dispatch(setLoggedUserData(myDecodedToken))
    } else {
        return data.data.message
    }
}

export const isAuth = () => async (dispatch) => {
    const userToken = localStorage.getItem("token")
    if (userToken) {
        const myDecodedToken = decodeToken(userToken)
        dispatch(setLoggedUserData(myDecodedToken))
        dispatch(setIsAuth(true))
        return myDecodedToken
    } else {
        dispatch(setLoggedUserData({username:"", firstName:"", lastName: "", telegramId: 0, role: ""}))
        dispatch(setIsAuth(false))
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("token")
    dispatch(setLoggedUserData({}))
    dispatch(setIsAuth(false))
}

export default authReducer;