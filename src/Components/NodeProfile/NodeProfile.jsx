import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { getNode, getNodeLogs } from "../../redux/nodes-reducer";
import s from "./NodeProfile.module.css"
import React from "react"
import LogBlock from "./LogBlock/LogBlock";

const NodeProfile = ({currentNode, currentNodeLogs, getNode, getNodeLogs}) => {
    const location = useLocation();
    const nodeId = location.pathname.split("/")[2];
    const navigate = useNavigate()

    const id = currentNode.id
    const mac = currentNode.mac
    const guid = currentNode.guid
    const ip = currentNode.ip
    const position = currentNode.position
    const rack = currentNode.rack
    const shelf = currentNode.shelf
    const state = currentNode.statement
    const description = currentNode.who

    useEffect(() => {
        getNode(nodeId)
        getNodeLogs(nodeId)
    }, [getNode, getNodeLogs, nodeId])

    let emoji = ""
    switch (state) {
        case "умер":
            emoji = "🔴"
            break;
        case "работает":
            emoji = "🟢"
            break;
        case "нужно обслужить":
            emoji = "🟡"
            break;
        case "ожидает возврата":
            emoji = "🔵"
            break;
        case "готов к установке":
            emoji = "🟣"
            break;
        case "ожидает ремонта":
            emoji = "🟠"
            break;
        default:
            break;
    }
    return (
        <div className={s.nodePage}>
            <button className={s.returnButton} onClick={() => {navigate("/map")}}>
                🡸 Назад
            </button>
            <div className={s.nodeHeader}>
                <div className={s.nodeName}>
                    <b>{`${emoji} ${id}`}</b>{`   (${rack}.${shelf}.${position}) - ${state}`}
                </div>
                <div className={s.nodeState}>
                    
                </div>
            </div>
            <div className={s.nodeInfo}>
                <div><b>{`Комментарий: `}</b>{`${description ? description : "---"}`}</div>
                <div><b>{`MAC: `}</b>{`${mac ? mac : "---"}`}</div>
                <div><b>{`GUID: `}</b>{`${guid ? guid : "---"}`}</div>
                <div><b>{`IP: `}</b>{`${ip ? ip : "---"}`}</div>
            </div>
            <div className={s.logsContainer}>
                {[...currentNodeLogs].reverse().map((log, index) => {
                    return <LogBlock key={index} {...log}></LogBlock>
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentNode: state.nodes.currentNode,
        currentNodeLogs: state.nodes.currentNodeLogs
    }
}

const NodeProfileContainer = connect(mapStateToProps, {getNode, getNodeLogs})(NodeProfile)



export default NodeProfileContainer;