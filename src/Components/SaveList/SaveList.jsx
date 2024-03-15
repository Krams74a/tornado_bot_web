import { connect } from "react-redux"
import {React, useState} from "react"
import { addList } from "../../redux/lists-reducer"
import { Alert, Modal } from "react-bootstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const SaveList = ({ showToastMessage, editModeSelectedNodes, showInfo, handleCloseInfo, isAuth, loggedUserInfo, addList }) => {
    const SignupSchema = Yup.object().shape({
        listName: Yup.string().required("Обязательное поле"),
        isPublic: Yup.string().required("Обязательное поле")
    })

    const formik = useFormik({
        validationSchema: SignupSchema,
        enableReinitialize: true,
        initialValues: {
            listName: "",
            isPublic: "false"
        },
        onSubmit: (values, { resetForm }) => {
            if (values.listName !== "") {
                let nodesIdsList = []
                editModeSelectedNodes.forEach(node => {
                    nodesIdsList.push(node.id)
                });
                console.log(values)
                addList(loggedUserInfo.username, values.listName, nodesIdsList, values.isPublic.toString()).then((errorText) => {
                    if (errorText){
                        showToastMessage("error", errorText)
                    } else {
                        resetForm({})
                        showToastMessage("success", `Список успешно сохранен. Перейдите в раздел 'Мои списки' (нажмите на имя пользователя сверху справа)`)
                        handleCloseInfo()
                    }
                })
            }
        }
    })

    if (!isAuth) {
        return (
            <Modal show={showInfo} onHide={handleCloseInfo} data-bs-theme="dark" style={{ color: "white" }}>
                <Modal.Header>
                    <Modal.Title>Сохранить как список</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Чтобы сохранить список необходимо <Link to="/login">войти</Link>.
                </Modal.Body>
            </Modal>
        )
    }
    return (
        <div>
            <Modal show={showInfo} onHide={handleCloseInfo} data-bs-theme="dark" style={{ color: "white" }}>
                <Modal.Header>
                    <Modal.Title>Сохранить как список</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="listName" className="mb-3">
                            <Form.Label>{`Название списка`}</Form.Label>
                            <Form.Control value={formik.values.listName} onChange={formik.handleChange} name="listName" type="text" placeholder="Вставили 12.03" />
                            {formik.errors.listName && 
                            <Alert variant="danger" style={{marginTop: "20px"}}>
                                {formik.errors.listName}
                            </Alert>
                            }
                        </Form.Group>
                        <Form.Group controlId="isPublic" className="mb-3">
                            <Form.Label>{`Видимость`}</Form.Label>
                            <Form.Check name="isPublic" value={formik.values.isPublic} onChange={formik.handleChange} type="checkbox" label="Публичный список" />
                            {formik.errors.isPublic && <Alert variant="danger" style={{marginTop: "20px"}}>
                                {formik.errors.isPublic}
                            </Alert>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ display: "flex", gap: "20px" }}>
                            <Button type="submit">Подтвердить</Button>
                            <Button variant="danger" onClick={() => { handleCloseInfo(); formik.resetForm({}) }}>Отмена</Button>
                    </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedUserInfo: state.auth.loggedUserInfo,
        isAuth: state.auth.isAuth,
        editModeSelectedNodes: state.nodes.editModeSelectedNodes
    }
}

const SaveListContainer = connect(mapStateToProps, { addList })(SaveList)

export default SaveListContainer;