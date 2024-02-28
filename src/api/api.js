import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
})

export const nodesAPI = {
    getNodes() {
        return axiosInstance.get(`/nodes`)
            .then(response => {
                return response.data
            })
    },
    getNode(nodeId) {
        nodeId = nodeId.slice(4)
        return axiosInstance.get(`/node/${nodeId}`)
            .then(response => {
                return response.data
            })
    },
    getNodeLogs(nodeId) {
        nodeId = nodeId.slice(4)
        return axiosInstance.get(`/logs/${nodeId}`)
            .then(response => {
                return response.data
            })
    },
    getLastLogs() {
        return axiosInstance.get(`/lastLogs`)
            .then(response => {
                return response.data
            })
    },
    addLog(newLog) {
        return axiosInstance.post(`/addLog`, newLog)
            .then(response => {
                console.log(response)
                return response.data
            })
    },
    addLogs(nodesList, newLog) {
        return axiosInstance.post(`/addLogs`, {nodesList: nodesList, newLog: newLog})
            .then(response => {
                console.log(response)
                return response.data
            })
    },
    updateNodeState(nodeId, newState) {
        return axiosInstance.post(`/node/${nodeId}`, {newState})
            .then(response => {
                console.log(response)
                return response.data
            })
    }
}

export const authAPI = {
    login(username, password) {
        return axiosInstance.post(`/auth/login`, { username, password })
            .then(response => {
                return response.data
            })
            .catch((error) => {
                return error.response
            })
    }
}