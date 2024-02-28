import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { getNode, getNodeLogs, addLog, updateNodeState, getNodeProfile } from "../../redux/nodes-reducer";
import s from "./NodeProfile.module.css"
import React from "react"
import LogBlock from "./LogBlock/LogBlock";
import { compose } from "redux";
import AddLog from "./AddLog/AddLog";
import { Button } from "react-bootstrap";
import { Modal, Row } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup"
import { useFormik } from "formik";
import Form from "react-bootstrap/Form"

const NodeProfile = ({ showToastMessage, currentNode, currentNodeLogs, getNodeProfile, loggedUserInfo, addLog, isAuth, updateNodeState }) => {
    const location = useLocation();
    const nodeId = location.pathname.split("/")[2];

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    const [statement, setStatement] = useState("default")

    useEffect(() => {
        getNodeProfile(nodeId)
    }, [nodeId])

    const addNewLog = (newLog) => {
        addLog(newLog)
    }

    const SignupSchema = Yup.object().shape({
        statement: Yup.string()
    })

    const formik = useFormik({
        validationSchema: SignupSchema,
        enableReinitialize: true,
        initialValues: {
            statement: currentNode.statement,
            mac: currentNode.mac,
            guid: currentNode.guid
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            if (values.statement === "default") {
                showToastMessage("error", "Выберите состояние")
                resetForm({})
            }
            else if (values.statement === currentNode.statement) {
                showToastMessage("error", `Невозможно заменить состояние узла на уже существующее ("${currentNode.statement}")`)
            } else if (!values.statement) {
                showToastMessage("error", "Ошибка")
                resetForm({})
            }
             else {
                let isSuccess = updateNodeState(currentNode, loggedUserInfo, values.statement)
                if (isSuccess) {
                    handleCloseInfo()
                    showToastMessage("success", "Состояние обновлено")
                    resetForm({})
                } else {
                    showToastMessage("error", "Ошибка")
                }
            }
        }
    })

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

    return (
        <div className={s.nodePage}>
            <div className={s.buttons}>
                <Button onClick={() => { navigate("/map") }}>
                    🡸 Назад
                </Button>
                <Button variant={"success"} onClick={handleShowInfo}>
                    Обновить состояние
                </Button>
            </div>
            <Modal show={showInfo} onHide={handleCloseInfo} data-bs-theme="dark" style={{ color: "white" }}>
                <Modal.Header>
                    <Modal.Title>{"Обновить состояние"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="mac" className="mb-3">
                            <Form.Label>{`MAC`}</Form.Label>
                            <Form.Control value={formik.values.mac} onChange={formik.handleChange} name="mac" type="text" placeholder="Mac" />
                        </Form.Group>
                        <Form.Group controlId="guid" className="mb-3">
                            <Form.Label>{`GUID`}</Form.Label>
                            <Form.Control value={formik.values.guid} onChange={formik.handleChange} name="guid" type="text" placeholder="Mac" />
                        </Form.Group>
                        <Form.Group controlId="statement" className="mb-3">
                            <Form.Label>{`Текущее состояние: ${getEmoji()} ${currentNode.statement}`}</Form.Label>
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
                        <Form.Group className="mb-3">
                            <Button type="submit">Подтвердить</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
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
                <AddLog isAuth={isAuth} addLog={addNewLog} {...currentNode} loggedUserInfo={loggedUserInfo} />
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

const NodeProfileContainer = compose(connect(mapStateToProps, { getNodeProfile, addLog, updateNodeState }))(NodeProfile)



export default NodeProfileContainer;