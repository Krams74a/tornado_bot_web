import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MapContainer from "../Map/Map";
import * as Yup from "yup"
import { useFormik } from "formik"
import { Form, Button, Alert } from "react-bootstrap";
import { getListByName } from "../../redux/lists-reducer";
import { useNavigate, useLocation } from "react-router-dom";
import ListBlock from "../MyLists/ListBlock";
import { v4 as uuidv4 } from 'uuid';
import { setSelectedNodes, setEditMode, getNodes } from "../../redux/nodes-reducer";

const EditList = ({ getListByName, worker, currentList, setSelectedNodes, setEditMode, getNodes, editModeSelectedNodes }) => {
    
    const location = useLocation();
    const listName = decodeURI(location.pathname.split("/")[2]);

    const navigate = useNavigate()

    const [editListMode, setEditListMode] = useState()
    console.log(listName)
    useEffect(() => {
        getListByName(listName)
    }, [listName])

    const SignupSchema = Yup.object().shape({
        listName: Yup.string().required("Обязательное поле"),
        isPublic: Yup.string().required("Обязательное поле")
    })

    const formik = useFormik({
        validationSchema: SignupSchema,
        enableReinitialize: true,
        initialValues: {
            listName: "",
            isPublic: true
        },
        onSubmit: (values, { resetForm }) => {

        }
    })

    if (!currentList) return <div>Loading</div>
    return (
        <div>
            <div style={{ width: "30%" }}>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" style={{ display: "flex", gap: "20px" }}>
                        <Button type="submit">Подтвердить</Button>
                        <Button variant="danger" onClick={() => { formik.resetForm({}) }}>Отмена</Button>
                    </Form.Group>
                    <Form.Group controlId="listName" className="mb-3">
                        <Form.Label>{`Название списка`}</Form.Label>
                        <Form.Control value={formik.values.listName} onChange={formik.handleChange} name="listName" type="text" placeholder="Вставили 12.03" />
                        {formik.errors.listName &&
                            <Alert variant="danger" style={{ marginTop: "20px" }}>
                                {formik.errors.listName}
                            </Alert>
                        }
                    </Form.Group>
                    <Form.Group controlId="isPublic" className="mb-3">
                        <Button onClick={() => {
                            setEditListMode(!editListMode); 
                            setSelectedNodes(currentList.nodesList); 
                            getNodes()
                            setEditMode(true)}} variant="success">Добавить/удалить узлы</Button>
                    </Form.Group>
                </Form>
            </div>

            {editListMode
                && <div>
                    <div style={{ display: "flex", width: "90%", gap: "20px", flexDirection: "column" }}>
                        <ListBlock key={uuidv4()} list={currentList} worker={worker} blockType={"short"} />
                    </div>
                    <MapContainer editListMode={editListMode} type="small" />
                </div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentList: state.lists.currentList,
        worker: state.auth.loggedUserInfo.username,
        editModeSelectedNodes: state.nodes.editModeSelectedNodes
    }
}

const EditListContainer = connect(mapStateToProps, { getListByName, setSelectedNodes, setEditMode, getNodes })(EditList)

export default EditListContainer