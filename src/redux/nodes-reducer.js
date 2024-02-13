import { nodesAPI } from "../api/api"

const SET_NODES = "nodes/SET_NODES"
const SET_CURRENT_NODE = "nodes/SET_CURRENT_NODE"
const SET_CURRENT_NODE_LOGS = "nodes/SET_CURRENT_NODE_LOGS"
const SET_NODES_LIST = "nodes/SET_NODES_LIST"
const SET_LAST_LOGS = "nodes/SET_LAST_LOGS"

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
    currentNode: {},
    currentNodeLogs: [],
    nodesList: [],
    logsInfo: []
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
        default:
            return state
    }
}

export const setNodes = (racks) => ({ type: SET_NODES, racks })
export const setCurrentNode = (currentNode) => ({ type: SET_CURRENT_NODE, currentNode })
export const setCurrentNodeLogs = (currentNodeLogs) => ({ type: SET_CURRENT_NODE_LOGS, currentNodeLogs })
export const setNodesList = (nodesList) => ({ type: SET_NODES_LIST, nodesList })
export const setLastLogs = (logsInfo) => ({ type: SET_LAST_LOGS, logsInfo })

export const getNode = (nodeId) => async (dispatch) => {
    let data = await nodesAPI.getNode(nodeId)
    let nodeInfo = data.data[0];
    dispatch(setCurrentNode(nodeInfo))
}

export const getNodeLogs = (nodeId) => async (dispatch) => {
    let data = await nodesAPI.getNodeLogs(nodeId)
    let nodeInfo = data.data;
    dispatch(setCurrentNodeLogs(nodeInfo))
}

export const getNodes = () => async (dispatch) => {
    let data = await nodesAPI.getNodes()
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
}

export const getLastLogs = () => async (dispatch) => {
    let data = await nodesAPI.getLastLogs()
    let logsInfo = data.data;
    dispatch(setLastLogs(logsInfo))
}

export default nodesReducer;
