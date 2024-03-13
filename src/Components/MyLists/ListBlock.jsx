import React, { useState } from "react";
import { Badge, Button, Card, Dropdown, Modal, Form, Alert } from "react-bootstrap"
import NodesArray from "./NodesArray";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { useFormik } from "formik"

const ListBlock = (props) => {
    const navigate = useNavigate()

    const [modalType, setModalType] = useState()
    const closeModal = () => setModalType()

    const deleteListHandler = () => {
        closeModal()
        props.deleteList(props.worker, props.list.listName)
        props.showToastMessage("success", `Список '${props.list.listName}' был успешно удален`)
    }

    const onOpenListOfNodes = () => {
        props.setSelectedNodes(props.list.nodesList)
        navigate("/editPage")
    }

    if (props.blockType && props.blockType === "short") {
        return (
            <div>
                <div>Выделенные узлы:</div>
                <div key={uuidv4()} style={{ display: "flex", flexWrap: "wrap", borderRadius: "5px", width: "100%", height: "auto", gap: "5px", padding: "10px" }}>
                
                    {
                        [...props.list.nodesList].map((node, index) => {
                            return (
                                <NodesArray key={uuidv4()} id={node.id} statement={node.statement} who={node.who} shelf={node.shelf} rack={node.rack} position={node.position} />
                            )
                        })}
            </div>
            </div>
            
        )
    }

    return (
        <Card key={uuidv4()} style={{ width: '90%', padding: "10px" }} data-bs-theme="dark">
        <Modal show={modalType === "delete"} data-bs-theme="dark" style={{ color: "white" }} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{`Удалить ${props.list.listName} (${props.list.nodesList.length} узлов)`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Вы действительно хотите удалить список '${props.list.listName}'?`}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalType()} variant="danger">Отмена</Button>
                <Button onClick={deleteListHandler}>Подтвердить</Button>
            </Modal.Footer>
        </Modal>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{display: "flex", gap: "10px"}}>
                <div key={uuidv4()} style={{ fontWeight: "700", marginBottom: "10px"}}>
                    {`${props.list.listName}
                     (${props.list.nodesList.length} узлов) ` }</div>
                     <div>
                     {props.list.isPublic === "true" 
                     ? <Badge bg="success">{"Публичный"}</Badge> 
                     : <Badge bg="secondary">{"Частный"}</Badge>}
                     </div>
                </div>
                
                <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate(`/editList/${props.list.listName}`)}>Редактировать</Dropdown.Item>
                        <Dropdown.Item onClick={() => setModalType("delete")}>Удалить</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div style={{ display: 'flex' }}>
                <div key={uuidv4()} style={{ display: "flex", flexWrap: "wrap", borderRadius: "5px", width: "100%", height: "auto", gap: "5px", padding: "10px" }}>
                    {
                        [...props.list.nodesList].map((node, index) => {
                            return (
                                <NodesArray key={uuidv4()} id={node.id} statement={node.statement} who={node.who} shelf={node.shelf} rack={node.rack} position={node.position} />
                            )
                        })}
                </div>
                <div style={{marginTop: "5px"}}>
                    <Button onClick={onOpenListOfNodes}>Открыть</Button>
                </div>
            </div>
        </Card>
    )
}

export default ListBlock;