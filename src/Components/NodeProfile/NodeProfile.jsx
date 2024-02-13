import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { getNode, getNodeLogs } from "../../redux/nodes-reducer";
import s from "./NodeProfile.module.css"
import useBreadcrumbs from "use-react-router-breadcrumbs";
import React from "react"
import LogBlock from "./LogBlock/LogBlock";

const NodeProfile = (props) => {
    const location = useLocation();
    const nodeId = location.pathname.split("/")[2];
    const navigate = useNavigate()

    const id = props.currentNode.id
    const mac = props.currentNode.mac
    const guid = props.currentNode.guid
    const ip = props.currentNode.ip
    const position = props.currentNode.position
    const rack = props.currentNode.rack
    const shelf = props.currentNode.shelf
    const state = props.currentNode.statement
    const description = props.currentNode.who

    useEffect(() => {
        props.getNode(nodeId)
        props.getNodeLogs(nodeId)
    }, [])

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
    }
    console.log(props.currentNodeLogs)
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
                {[...props.currentNodeLogs].reverse().map(log => {
                    return <LogBlock {...log}></LogBlock>
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