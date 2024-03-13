import { Button, Row, Card, Form } from "react-bootstrap"
import React, { useState } from "react";
import * as Yup from "yup"
import { Link } from "react-router-dom"
import s from "./AddLog.module.css"
import { useFormik } from "formik";

const AddLog = (props) => {
    console.log(props)
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

    const formik = useFormik({
        validationSchema: SignupSchema,
        enableReinitialize: true,
        initialValues: {
            log: ""
        },
        onSubmit: (values, { resetForm }) => {
            onSubmit(values, resetForm)
        }
    })

    const onSubmit = (values, resetForm) => {
        console.log(values)
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

            props.addLog(newLog)
            props.showToastMessage("success", "Лог успешно добавлен")
            resetForm({})
        }
    }

    return (
        props.isAuth ? <div className={s.addLog}>
            <Card bg="dark" style={{ padding: "10px", color:"white" }}>
                <Form onSubmit={formik.handleSubmit} style={{ padding: "10px", color: "white" }}>
                    <Form.Group controlId={"log"} style={{display:"flex", gap: "10px", flexDirection: "column"}}>
                            <Form.Label style={{fontWeight: "700"}}>Добавить лог</Form.Label>
                            <Form.Control
                                as={"textarea"}
                                name="log"
                                className="form-control"
                                type="text"
                                placeholder="Что сейчас с узлом?"
                                onChange={formik.handleChange}
                                value={formik.values.log}
                            />
                        <Button style={{width: props.buttonWidth}} type="submit">Добавить</Button>
                    </Form.Group>
                </Form>
            </Card>
        </div>
            : <div className={s.addLog}>
                Чтобы добавить логи необходимо <Link to="/login">войти</Link>.
            </div>
    )
}

export default AddLog
