import React from "react";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import ListItem from "../NodesList/ListItem/ListItem";
import { addLogs } from "../../redux/nodes-reducer";
import AddLogs from "../NodeProfile/AddLog/AddLogs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const EditSelectedNodesPage = (props) => {
    const navigate = useNavigate();
    
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    if (props.editModeSelectedNodes.length > 0) {
        return (
            <div>
                <Button onClick={handleShowInfo} style={{ marginBottom: "10px" }}>Добавить лог</Button>
                <Table bordered hover variant="dark" responsive style={{ width: "95%" }}>
                    <thead>
                        <tr>
                            <th>NodeId</th>
                            <th>Состояние</th>
                            <th>Комментарий</th>
                            <th>GUID</th>
                            <th>MAC</th>
                            <th>IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...props.editModeSelectedNodes.reverse()].map((node, index) => {
                            return <ListItem key={index} id={node.id}
                                state={node.state}
                                mac={node.mac}
                                ip={node.ip}
                                guid={node.guid}
                                who={node.who}
                                rack={node.rack}
                                shelf={node.shelf}
                                position={node.position}></ListItem>
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

const EditSelectedNodesPageContainer = connect(mapStateToProps, { addLogs })(EditSelectedNodesPage)

export default EditSelectedNodesPageContainer