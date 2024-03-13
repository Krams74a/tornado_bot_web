import { listsAPI } from "../api/api"
import { nodesAPI } from "../api/api"
import { setSelectedNodes } from "./nodes-reducer"

const SET_LISTS = "lists/SET_LISTS"
const SET_IS_LOADED = "lists/SET_IS_LOADED"
const SET_PUBLIC_LISTS = "lists/SET_PUBLIC_LISTS"
const SET_CURRENT_LIST = "lists/SET_CURRENT_LIST"

let initialState = {
    isLoaded: false,
    userLists: [],
    publicLists: [],
}

export const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                userLists: action.lists
            }
        case SET_PUBLIC_LISTS:
            return {
                ...state,
                publicLists: action.publicLists
            }
        case SET_IS_LOADED:
            return {
                ...state,
                isLoaded: true
            }
        case SET_CURRENT_LIST:
            return {
                ...state,
                currentList: action.list
            }
        default:
            return state
    }
}

export const setLists = (lists) => ({ type: SET_LISTS, lists })
export const setCurrentList = (list) => ({ type: SET_CURRENT_LIST, list })
export const setIsLoaded = () => ({ type: SET_IS_LOADED })
export const setPublicLists = (publicLists) => ({type: SET_PUBLIC_LISTS, publicLists})

export const getLists = (username) => async (dispatch) => {
    listsAPI.getLists(username).then(lists => {
        dispatch(setLists(lists))
        dispatch(setIsLoaded())
    })
}

export const getListByName = (listName) => async (dispatch) => {
    console.log(listName)
    listsAPI.getListByName(listName).then(list => {
        console.log(list[0].listName)
        dispatch(setCurrentList(list[0]))
    })
}

export const getPublicLists = () => async (dispatch) => {
    console.log("sdfsdf")
    listsAPI.getPublicLists().then(publicLists => {
        console.log(publicLists)
        dispatch(setPublicLists(publicLists))
    })
}

export const addList = (username, listName, list, isPublic) => async (dispatch) => {
    console.log(isPublic)
    let data = await listsAPI.addList(username, listName, list, isPublic)
    let errorText = ""
    if (data.data.errno === 19) {
        errorText = "Такое имя уже существует"
        return errorText
    } else if (data.status === 500) {
        errorText = "Ошибка"
        return errorText
    } else {
        dispatch(getLists(username))
        dispatch(getPublicLists())
    }
}

export const deleteList = (worker, listName) => async (dispatch) => {
    let data = await listsAPI.deleteList(worker, listName)
    let errorText = ""
    if (data.status === 500) {
        errorText = "Ошибка"
        return errorText
    } else {
        dispatch(getLists(worker))
        dispatch(getPublicLists())
    }
}


export default listsReducer;
