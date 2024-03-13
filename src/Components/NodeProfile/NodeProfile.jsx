import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { addLog, updateNode, getNodeProfile } from "../../redux/nodes-reducer";
import s from "./NodeProfile.module.css"
import React from "react"
import LogBlock from "./LogBlock/LogBlock";
import { compose } from "redux";
import AddLog from "./AddLog/AddLog";
import { Button } from "react-bootstrap";
import UpdateNode from "../UpdateNode/UpdateNode";

const NodeProfile = ({ showToastMessage, currentNode, currentNodeLogs, getNodeProfile, loggedUserInfo, addLog, isAuth, updateNode }) => {
    const location = useLocation();
    const nodeId = location.pathname.split("/")[2];
    console.log(currentNode)
    const navigate = useNavigate()

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    useEffect(() => {
        getNodeProfile(nodeId)
    }, [nodeId])

    const addNewLog = (newLog) => {
        addLog(newLog)
    }

    const getEmoji = () => {
        switch (currentNode.statement) {
            case "умер":
                return "🔴"
            case "работает":
                return "🟢"
            case "нужно обслужить":
                return "🟡"
            case "ожидает возврата":
                return "🔵"
            case "готов к установке":
                return "🟣"
            case "ожидает ремонта":
                return "🟠"
            default:
                break;
        }
    }
    if (!currentNode) return <div>Loading...</div>
    return (
        <div className={s.nodePage}>
            <div className={s.buttons}>
                <Button onClick={() => { navigate(-1) }}>
                    🡸 Назад
                </Button>
                <Button variant={"success"} onClick={handleShowInfo}>
                    Редактировать
                </Button>
            </div>
            <UpdateNode 
            showInfo = {showInfo}
            handleCloseInfo = {() => handleCloseInfo()}
            currentNode = {currentNode}
            loggedUserInfo = {loggedUserInfo}
            showToastMessage = {showToastMessage}
            updateNode = {updateNode}
            getEmoji={() => getEmoji()} 
            isAuth={isAuth}
            />
            <div className={s.nodeHeader}>
                <div className={s.nodeName}>
                    <b>{`${getEmoji()} ${currentNode.id}`}</b>{`   (${currentNode.rack}.${currentNode.shelf}.${currentNode.position}) - ${currentNode.statement}`}
                </div>
            </div>
            <div className={s.nodeInfo}>
                <div><b>{`Комментарий: `}</b>{`${currentNode.who ? currentNode.who : "---"}`}</div>
                <div><b>{`MAC: `}</b>{`${currentNode.mac ? currentNode.mac : "---"}`}</div>
                <div><b>{`GUID: `}</b>{`${currentNode.guid ? currentNode.guid : "---"}`}</div>
                <div><b>{`IP: `}</b>{`${currentNode.ip ? currentNode.ip : "---"}`}</div>
            </div>
            <div>
                <AddLog buttonWidth="20%" showToastMessage={showToastMessage} isAuth={isAuth} addLog={addNewLog} {...currentNode} loggedUserInfo={loggedUserInfo} />
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
        currentNodeLogs: state.nodes.currentNodeLogs,
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const NodeProfileContainer = connect(mapStateToProps, { getNodeProfile, addLog, updateNode })(NodeProfile)



export default NodeProfileContainer;