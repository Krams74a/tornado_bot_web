import { isAuth } from "./auth-reducer"
import { getLastLogs, getNodes } from "./nodes-reducer"

const INITIALIZED_SUCCESS = "app-reducer/INITIALIZED_SUCCESS"

let initialState = {
    initialized: false,
    colors: {
        backgroundColor: "#424242"
    }
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
    try {
        let promise = dispatch(isAuth())
        promise.then(() => {
            let isSuccess =  dispatch(getNodes())
            if (isSuccess) {
                dispatch(getLastLogs())
                dispatch(initializingSuccess())
                return true
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