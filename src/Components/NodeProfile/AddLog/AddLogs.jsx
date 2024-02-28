import React from "react"
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import { Button, Row } from "react-bootstrap";
import { useState } from "react";
import * as Yup from "yup"


const AddLogs = (props) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const SignupSchema = Yup.object().shape({
        content: Yup.string()
    })

    const dateToDBFormat = (date) => {
        date = date.split(" ")
        date.length = 5
        const halfBeforeTheUnwantedElement = date.slice(0, 3)
        const halfAfterTheUnwantedElement = date.slice(4)
        date = halfBeforeTheUnwantedElement.concat(halfAfterTheUnwantedElement)
        let year = new Date().getFullYear().toString()
        date.push(year)
        date = date.join(" ")
        return date
    }

    const onSubmit = (values, resetForm) => {
        console.log("AAA")
        let date = new Date().toString();
        date = dateToDBFormat(date)
        const newLog = {
            worker: props.loggedUserInfo.lastName + " " + props.loggedUserInfo.firstName,
            date: date,
            log: values.log
        }

        let isSuccess = props.addLogs(props.editModeSelectedNodes, newLog)
        console.log(isSuccess)
        if (isSuccess) {
            props.showToastMessage("success", "Логи успешно добавлены")
            setSuccess("Успешно")
            resetForm({})
        } else {
            props.showToastMessage("error", "Ошибка")
            setError("Ошибка")
        }
    }

    return (
        <Formik initialValues={{ log: '', }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values, resetForm)
            }}>
            <Form>
                <Row className="mb-3">
                    <div style={error || success ? { marginBottom: "1rem" } : {}}>
                        <label htmlFor="log">{"Добавить лог (добавятся на все узлы)"}</label>
                        <Field
                            as={"textarea"}
                            name="log"
                            className="form-control"
                            type="text"
                            placeholder="Что сейчас с узлами?"
                        />
                        <ErrorMessage component="div" name="log" className="alert alert-danger col-md-4" style={{ padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%" }} />
                    </div>
                </Row>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleCloseInfo}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={props.handleCloseInfo}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Form>
        </Formik>
    )
}

export default AddLogs