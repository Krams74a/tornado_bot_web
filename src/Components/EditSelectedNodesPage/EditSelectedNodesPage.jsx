import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import ListItem from "../NodesList/ListItem/ListItem";
import { addLogs, updateNode } from "../../redux/nodes-reducer";
import AddLogs from "../NodeProfile/AddLog/AddLogs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import SaveListContainer from "../SaveList/SaveList";

const EditSelectedNodesPage = (props) => {
    const navigate = useNavigate();
    
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    const [showSave, setShowSave] = useState(false);
    const handleCloseSave = () => setShowSave(false);
    const handleOpenSave = () => setShowSave(true);

    if (props.editModeSelectedNodes.length > 0) {
        return (
            <div>
                <SaveListContainer showToastMessage={props.showToastMessage} showInfo={showSave} handleShowInfo={handleOpenSave} handleCloseInfo={handleCloseSave}/>
                <div style={{display: "flex", gap: "20px", marginBottom: "10px"}}>
                    <Button onClick={() => navigate(-1)}>Назад</Button>
                    <Button onClick={handleShowInfo}>Добавить логи</Button>
                    <Button variant="success" onClick={handleOpenSave}>Сохранить как список</Button>
                </div>
                <Table bordered hover variant="dark" responsive style={{ width: "95%" }}>
                    <thead>
                        <tr>
                            <th>NodeId</th>
                            <th>Состояние</th>
                            <th>Комментарий</th>
                            <th>GUID</th>
                            <th>MAC</th>
                            <th>IP</th>
                            <th>Кнопки</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...props.editModeSelectedNodes].map((node, index) => {
                            return <ListItem 
                                key={index} 
                                id={node.id}
                                statement={node.statement}
                                mac={node.mac}
                                ip={node.ip}
                                guid={node.guid}
                                who={node.who}
                                rack={node.rack}
                                shelf={node.shelf}
                                position={node.position}
                                updateNode={props.updateNode}
                                loggedUserInfo={props.loggedUserInfo}
                                type="selectedList"
                                showToastMessage={props.showToastMessage}
                                isAuth={props.isAuth}
                                ></ListItem>
                        })}
                    </tbody>
                </Table>
                <Modal show={showInfo} onHide={handleCloseInfo} data-bs-theme="dark" style={{ color: "white" }}>
                    <Modal.Header>
                        <Modal.Title>{"Добавить лог на узлы"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddLogs {...props} addLogs={props.addLogs} handleCloseInfo={() => handleCloseInfo()} handleShowInfo={() => handleShowInfo()}/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    } else {
        navigate("/map")
    }

}

const mapStateToProps = (state) => {
    return {
        editModeSelectedNodes: state.nodes.editModeSelectedNodes,
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const EditSelectedNodesPageContainer = connect(mapStateToProps, { addLogs, updateNode })(EditSelectedNodesPage)

export default EditSelectedNodesPageContainer