import axios from "axios";
import qs from "qs"

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
    getNodesByIds(nodesIds) {
        const params = new URLSearchParams();

        nodesIds.split(",").forEach((nodeId, index) => {
            params.append(`ids`, nodeId);
        });

        return axiosInstance.get(`/nodesByIds`, { params })
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
        return axiosInstance.post(`/addLogs`, { nodesList: nodesList, newLog: newLog })
            .then(response => {
                console.log(response)
                return response.data
            })
    },
    updateNode(node) {
        console.log(node)
        return axiosInstance.post(`/node/${node.id}`, { node: node })
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

export const listsAPI = {
    getLists(username) {
        return axiosInstance.get(`/lists/${username}`)
            .then(response => {
                return response.data.data
            })
            .catch((error) => {
                return error.response
            })
    },
    getPublicLists() {
        return axiosInstance.get(`/publicLists`)
        .then(response => {
            console.log(response.data)
            return response.data.data
        })
        .catch((error) => {
            return error.response
        })
    },
    getListByName(listName) {
        return axiosInstance.get(`/list/${listName}`)
        .then(response => {
            return response.data.data
        })
        .catch(error => {
            return error.response
        })
    },
    addList(username, listName, list, isPublic) {
        return axiosInstance.post(`/lists`, { username, listName, list, isPublic })
            .then(response => {
                console.log(response)
                return response.data
            })
            .catch((error) => {
                console.log(error)
                return error.response
            })
    },
    deleteList(worker, listName) {
        console.log(worker, listName)
        return axiosInstance.post(`/lists/delete`, { worker, listName })
            .then(response => {
                console.log(response)
                return response.data
            })
            .catch((error) => {
                console.log(error)
                return error.response
            })
    }
}