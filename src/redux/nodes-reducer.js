import { nodesAPI } from "../api/api"
import { initializeApp } from "./app-reducer"

const SET_NODES = "nodes/SET_NODES"
const SET_CURRENT_NODE = "nodes/SET_CURRENT_NODE"
const UPDATE_CURRENT_NODE = "nodes/UPDATE_CURRENT_NODE"
const SET_CURRENT_NODE_LOGS = "nodes/SET_CURRENT_NODE_LOGS"
const SET_NODES_LIST = "nodes/SET_NODES_LIST"
const SET_LAST_LOGS = "nodes/SET_LAST_LOGS"
const SET_EDIT_MODE = "nodes/SET_EDIT_MODE"
const ADD_SELECTED_NODE = "nodes/ADD_SELECTED_NODE"
const SET_SELECTED_NODES = "nodes/SET_SELECTED_NODES"
const DELETE_SELECTED_NODE = "nodes/DELETE_SELECTED_NODE"
const CLEAR_SELECTED_NODES = "nodes/CLEAR_SELECTED_NODES"
const UPDATE_SELECTED_NODE = "nodes/UPDATE_SELECTED_NODE"
const CHANGE_NODE_HIGHLIGHT = "nodes/CHANDE_NODE_HIGHLIGHT"

let initialState = {
    racks: [
        [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ], [
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}]
        ]
    ], 
    currentNodeLogs: [],
    logsInfo: [],
    editMode: false,
    editModeSelectedNodes: []
}

//{guid:"002590ffff283855",id:"node480",ip:"10.4.2.68\n",mac:"0025902d13f8",position:"6",rack:"7",shelf:"8",statement:"работает",who:null}


export const nodesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NODES:
            return {
                ...state,
                racks: [...action.racks]
            }
        case SET_CURRENT_NODE:
            return {
                ...state,
                currentNode: action.currentNode
            }
        case UPDATE_CURRENT_NODE:
            return {
                ...state,
                currentNode: action.currentNode
            }
        case SET_CURRENT_NODE_LOGS:
            return {
                ...state,
                currentNodeLogs: [...action.currentNodeLogs]
            }
        case SET_NODES_LIST:
            return {
                ...state,
                nodesList: [...action.nodesList]
            }
        case SET_LAST_LOGS:
            return {
                ...state,
                logsInfo: [...action.logsInfo]
            }
        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.editMode
            }
        case ADD_SELECTED_NODE:
            return {
                ...state,
                editModeSelectedNodes: [...state.editModeSelectedNodes, action.node].sort((prevNode, nextNode) => {return parseInt(prevNode.id.replace("node", "")) - parseInt(nextNode.id.replace("node", ""))}),
            }
        case CHANGE_NODE_HIGHLIGHT:
            let selectedNodeIds = []
            state.editModeSelectedNodes.forEach(node => {
                selectedNodeIds.push(node.id)
            })
            console.log(selectedNodeIds)
            console.log(state.racks.map(rack => rack.map(shelf => shelf.map(node => selectedNodeIds.includes(node.id) ? {...node, isHighlight: true} : node))))
            return {
                ...state,
                racks: state.racks.map(rack => rack.map(shelf => shelf.map(node => selectedNodeIds.includes(node.id) ? {...node, isHighlight: true} : node)))
            }
        case SET_SELECTED_NODES:
            return {
                ...state,
                editModeSelectedNodes: action.nodes
            }
        case DELETE_SELECTED_NODE:
            console.log(action)
            return {
                ...state,
                editModeSelectedNodes: state.editModeSelectedNodes.filter(node => node.id !== action.nodeId)
            }
        case CLEAR_SELECTED_NODES:
            return {
                ...state,
                editModeSelectedNodes: []
            }
        case UPDATE_SELECTED_NODE:
            console.log(action)
            return {
                ...state,
                editModeSelectedNodes: (state.editModeSelectedNodes.map
                (node => node.id === action.node.id ?
                    action.node : node)).sort((prevNode, nextNode) => {return parseInt(prevNode.id.replace("node", "")) - parseInt(nextNode.id.replace("node", ""))})
            }
        default:
            return state
    }
}

export const setNodes = (racks) => ({ type: SET_NODES, racks })
export const setCurrentNode = (currentNode) => ({ type: SET_CURRENT_NODE, currentNode })
export const setCurrentNodeLogs = (currentNodeLogs) => ({ type: SET_CURRENT_NODE_LOGS, currentNodeLogs })
export const setNodesList = (nodesList) => ({ type: SET_NODES_LIST, nodesList })
export const setLastLogs = (logsInfo) => ({ type: SET_LAST_LOGS, logsInfo })
export const setEditMode = (editMode) => ({ type: SET_EDIT_MODE, editMode })
export const addSelectedNode = (node) => ({ type: ADD_SELECTED_NODE, node })
export const setSelectedNodes = (nodes) => ({ type: SET_SELECTED_NODES, nodes })
export const updateSelectedNode = (node) => ({ type: UPDATE_SELECTED_NODE, node })
export const deleteSelectedNode = (nodeId) => ({ type: DELETE_SELECTED_NODE, nodeId })
export const clearSelectedNodes = () => ({ type: CLEAR_SELECTED_NODES })


export const getNode = (nodeId) => async (dispatch) => {
    let data = await nodesAPI.getNode(nodeId)
    let nodeInfo = data.data[0];
    dispatch(setCurrentNode(nodeInfo))
    return nodeInfo
}

export const updateSelectedNodes = (selectedNodes) => async (dispatch) => {
    selectedNodes.forEach(node => {
        dispatch(updateSelectedNode(node))
    });
}

export const getNodeLogs = (nodeId) => async (dispatch) => {
    let data = await nodesAPI.getNodeLogs(nodeId)
    let nodeInfo = data.data;
    dispatch(setCurrentNodeLogs(nodeInfo))
}

export const getNodes = () => async (dispatch) => {
    let data = await nodesAPI.getNodes()
    if (data.message === "success") {
        data = data.data.reverse()
        let newData = []
        newData = data.filter(function (node) {
            return node.id.includes("node");
        });
        newData = newData.filter(function (node) {
            let nodeName = parseInt(node.id.slice(4))
            if ((nodeName < 337) || (nodeName > 384)) {
                nodeName = nodeName.toString()
                if (nodeName.lenght === 1) {
                    nodeName = "00" + nodeName
                }
                if (nodeName.lenght === 2) {
                    nodeName = "0" + nodeName
                }
                return nodeName
            }
            return 0
        });
        dispatch(setNodesList(newData))
        let racks = [
            [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ], [
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}]
            ]
        ]
    
        newData.forEach(node => {
            let node_rack = node.rack - 1
            let node_shelf = node.shelf - 1
            let node_position = node.position - 1
            racks[node_rack][node_shelf][node_position] = node
        });
        dispatch(setNodes(racks))
        return true
    }
    else {
        return false
    }
    
}

export const getNodeProfile = (nodeId) => async (dispatch) => {
    console.log(nodeId)
    dispatch(getNode(nodeId))
    dispatch(getNodeLogs(nodeId))
}

export const getLastLogs = () => async (dispatch) => {
    let data = await nodesAPI.getLastLogs()
    let logsInfo = data.data;
    dispatch(setLastLogs(logsInfo))
}

export const addLog = (newLog) => async (dispatch) => {
    let data = await nodesAPI.addLog(newLog)
    if (data.message === "success") {
        dispatch(getNodeLogs(newLog.id))
        return true
    } else {
        return false
    }
}

export const updateNode = (node, log, loggedUserInfo) => async (dispatch) => {
    console.log(node, loggedUserInfo)
    let data = await nodesAPI.updateNode(node)
    if (data.message === "success") {
        let date = new Date().toString();
        date = date.split(" ")
        date.length = 5
        const halfBeforeTheUnwantedElement = date.slice(0, 3)
        const halfAfterTheUnwantedElement = date.slice(4)
        date = halfBeforeTheUnwantedElement.concat(halfAfterTheUnwantedElement)
        let year = new Date().getFullYear().toString()
        date.push(year)
        date = date.join(" ")

        const newLog = {
            id: node.id,
            mac: node.mac,
            worker: loggedUserInfo.lastName + " " + loggedUserInfo.firstName,
            date: date,
            log: log
        }
        dispatch(addLog(newLog))
        dispatch(getNode(node.id))
        dispatch(updateSelectedNode(node))
        dispatch(initializeApp())
        return true
    } else {
        return false
    }
}

export const addLogs = (nodesList, newLog) => async (dispatch) => {
    let data = await nodesAPI.addLogs(nodesList, newLog)
    if (data.message === "success") {
        dispatch(initializeApp())
        return true
    }
    else {
        return false
    }
}

export default nodesReducer;
