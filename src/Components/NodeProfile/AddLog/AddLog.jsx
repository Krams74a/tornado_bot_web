import { Button, Row } from "react-bootstrap"
import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup"
import { Link } from "react-router-dom"
import s from "./AddLog.module.css"


const AddLog = (props) => {
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
        let date = new Date().toString();
        date = dateToDBFormat(date)
        if (values.log !== "") {
            const newLog = {
                id: props.id,
                mac: props.mac,
                worker: props.loggedUserInfo.lastName + " " + props.loggedUserInfo.firstName,
                date: date,
                log: values.log
            }
    
            let isSuccess = props.addLog(newLog)
            if (isSuccess) {
                setSuccess("Успешно")
                resetForm({})
            } else {
                setError("Ошибка")
            }
        }
    }

    return (
        props.isAuth ? <div className={s.addLog}>
            <Formik initialValues={{ log: '', }}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values, resetForm)
                }}>
                <Form>
                    <Row className="mb-3" data-bs-theme="dark">
                        <div style={error || success ? { marginBottom: "1rem" } : {}}>
                            <label htmlFor="log">Добавить лог</label>
                            <Field
                                as={"textarea"}
                                name="log"
                                className="form-control"
                                type="text"
                                placeholder="Что сейчас с узлом?"
                            />
                            <ErrorMessage component="div" name="log" className="alert alert-danger col-md-4" style={{ padding: "5px", marginBottom: "5px", marginTop: "5px", width: "100%" }} />
                        </div>
                    </Row>
                    <div className="col-md-4">
                        <Button type="submit">Добавить</Button>
                        <Row className="mb-3">
                        </Row>
                    </div>
                </Form>
            </Formik>
        </div>
            : <div className={s.addLog}>
                Чтобы добавить логи необходимо <Link to="/login">войти</Link>.
            </div>
    )
}

export default AddLog
