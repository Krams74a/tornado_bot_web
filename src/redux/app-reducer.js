import { isAuth } from "./auth-reducer"
import { getLists, getPublicLists } from "./lists-reducer"
import { getLastLogs, getNodes } from "./nodes-reducer"

const INITIALIZED_SUCCESS = "app-reducer/INITIALIZED_SUCCESS"

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
    console.log("INITIALIZE ")
    try {
        let promise = dispatch(isAuth())
        promise.then((token) => {
            console.log(token)
            let isSuccess = dispatch(getNodes())
            dispatch(getLists(token.username))
            dispatch(getPublicLists())
            if (isSuccess) {
                dispatch(getLastLogs())
                dispatch(initializingSuccess())
            }
            else {
                return false
            }
        })
    } 
    catch {
        return false
    }
    
}

export default appReducer;