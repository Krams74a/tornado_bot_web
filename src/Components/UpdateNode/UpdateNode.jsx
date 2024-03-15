import React from "react"
import { Alert, Button, Modal } from "react-bootstrap";
import * as Yup from "yup"
import { useFormik } from "formik";
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom";
import { compose } from "redux";

const UpdateNode = ({showInfo, handleCloseInfo, currentNode, loggedUserInfo, showToastMessage, updateNode, isAuth}) => {
    const SignupSchema = Yup.object().shape({
        mac: Yup.string()
        .required("Обязательное поле")
        .min(12, "Длина MAC должна быть 12 символов")
        .max(12, "Длина MAC должна быть 12 символов"),
        guid: Yup.string()
        .required("Обязательное поле")
        .min(16, "Длина GUID должна быть 16 символов")
        .max(16, "Длина GUID должна быть 16 символов"),
        ip: Yup.string()
        .required("Обязательное поле")
        .min(7)
        .matches(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, "Некорректный формат IP"),
        statement: Yup.string()
        .required("Обязательное поле"),
        who: Yup.string()
        .nullable()
    })

    const createLogsByChanges = (currentNode, changedNode) => {
        let logs = ""
        if (currentNode.mac !== changedNode.mac) {
            logs = logs + `MAC был изменён с '${currentNode.mac}' на '${changedNode.mac}'` + '\n'
        }
        if (currentNode.guid !== changedNode.guid) {
            logs = logs + `GUID был изменён с '${currentNode.guid}' на '${changedNode.guid}'` + '\n'
        }
        if (currentNode.ip.replace("\n", "") !== changedNode.ip) {
            logs = logs + `IP был изменён с '${currentNode.ip}' на '${changedNode.ip}'` + '\n'
        }
        if (currentNode.statement !== changedNode.statement) {
            if (changedNode.statement === "работает") {
                logs = logs + `Состояние узла было изменено на '${changedNode.statement}'` + '\n'
            } else {
                logs = logs + `Состояние узла было изменено на '${changedNode.statement}' - '${changedNode.who}'` + '\n'
            }
        } else if (currentNode.who !== changedNode.who && changedNode.who !== null) {
            logs = logs + `Комментарий был изменён с '${currentNode.who}' на '${changedNode.who}'`
        }
        return logs
    }

    const formik = useFormik({
        validationSchema: SignupSchema,
        enableReinitialize: true,
        initialValues: {
            statement: currentNode.statement,
            mac: currentNode.mac,
            guid: currentNode.guid,
            ip: currentNode.ip.replace("\n", ""),
            who: currentNode.who === null ? null : currentNode.who
        },
        
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            if (values.statement === "default") {
                showToastMessage("error", "Выберите состояние")
            }
            else if (values.statement !== "работает" && values.who === "" ) {
                showToastMessage("error", "Необходим комментарий")
            }
            else if (!values.statement) {
                showToastMessage("error", "Ошибка")
                resetForm({})
            }
            else {
                const node = {
                    id: currentNode.id,
                    rack: currentNode.rack,
                    shelf: currentNode.shelf,
                    position: currentNode.position,
                    mac: values.mac,
                    guid: values.guid,
                    ip: values.ip,
                    statement: values.statement,
                    who: values.statement === "работает" ? "" : values.who
                }
                const logs = createLogsByChanges(currentNode, node)
                if (logs.length > 0) {
                    let isSuccess = updateNode(node, logs, loggedUserInfo)
                    if (isSuccess) {
                        handleCloseInfo()
                        showToastMessage("success", "Состояние обновлено")
                        resetForm({})
                    } else {
                        showToastMessage("error", "Ошибка")
                    }
                } else {
                    showToastMessage("error", "Вы не внесли изменений")
                }
            }
        }
    })

    if (!isAuth) return (
        <Modal show={showInfo} onHide={() => { handleCloseInfo(); formik.resetForm({}) }} data-bs-theme="dark" style={{ color: "white" }}>
            <Modal.Header>
                <Modal.Title>{`Редактирование (${currentNode.id})`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Чтобы редактировать узел необходимо <Link to="/login">войти</Link>.
            </Modal.Body>
        </Modal>
    )
    return (
        <Modal show={showInfo} onHide={() => { handleCloseInfo(); formik.resetForm({}) }} data-bs-theme="dark" style={{ color: "white" }}>
            <Modal.Header>
                <Modal.Title>{`Редактирование (${currentNode.id})`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>

                    <Form.Group controlId="mac" className="mb-3">
                        <Form.Label>{`MAC`}</Form.Label>
                        <Form.Control value={formik.values.mac} onChange={formik.handleChange} name="mac" type="text" placeholder="Mac" />
                    </Form.Group>
                    {
                    formik.errors.mac && 
                    <Alert variant="danger">
                        {formik.errors.mac}
                    </Alert>
                    }

                    <Form.Group controlId="guid" className="mb-3">
                        <Form.Label>{`GUID`}</Form.Label>
                        <Form.Control value={formik.values.guid} onChange={formik.handleChange} name="guid" type="text" placeholder="Mac" />
                    </Form.Group>
                    {
                    formik.errors.guid && 
                    <Alert variant="danger">
                        {formik.errors.guid}
                    </Alert>
                    }

                    <Form.Group controlId="ip" className="mb-3">
                        <Form.Label>{`IP`}</Form.Label>
                        <Form.Control value={formik.values.ip} onChange={formik.handleChange} name="ip" type="text" placeholder="Ip" />
                    </Form.Group>
                    {
                    formik.errors.ip && 
                    <Alert variant="danger">
                        {formik.errors.ip}
                    </Alert>
                    }

                    <Form.Group controlId="statement" className="mb-3">
                        <Form.Label>{`Состояние узла: `}</Form.Label>
                        <Form.Select value={formik.values.statement} type="select" onChange={formik.handleChange} onBlur={formik.handleBlur} name="statement">
                            <option value="default">Выберите новое состояние</option>
                            <option value={"умер"}>🔴 Умер</option>
                            <option value={"работает"}>🟢 Работает</option>
                            <option value={"нужно обслужить"}>🟡 Нужно обслужить</option>
                            <option value={"ожидает возврата"}>🔵 Ожидает возврата</option>
                            <option value={"готов к установке"}>🟣 Готов к установке</option>
                            <option value={"ожидает ремонта"}>🟠 Ожидает ремонта</option>
                        </Form.Select>
                    </Form.Group>
                    {
                    formik.errors.statement && 
                    <Alert variant="danger">
                        {formik.errors.statement}
                    </Alert>
                    }

                    { <Form.Group controlId="who" className="mb-3">
                        <Form.Label>{`Комментарий`}</Form.Label>
                        <Form.Control disabled={formik.values.statement === 'работает'} value={formik.values.who} onChange={formik.handleChange} name="who" type="text" placeholder="Комментарий" />
                    </Form.Group>}
                    {
                    formik.errors.who && 
                    <Alert variant="danger">
                        {formik.errors.who}
                    </Alert>
                    }


                    <Form.Group className="mb-3" style={{ display: "flex", gap: "20px" }}>
                        <Button type="submit">Подтвердить</Button>
                        <Button variant="danger" onClick={() => { handleCloseInfo(); formik.resetForm({}) }}>Отмена</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateNode;