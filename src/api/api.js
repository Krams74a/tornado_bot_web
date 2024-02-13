import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://192.168.102.26:8000/api"
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
    }
}