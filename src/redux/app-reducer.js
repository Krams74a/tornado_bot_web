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
    dispatch(getNodes())
    let logsPromise = dispatch(getLastLogs())
    logsPromise.then(() => {
        dispatch(initializingSuccess())
    })
}

export default appReducer;