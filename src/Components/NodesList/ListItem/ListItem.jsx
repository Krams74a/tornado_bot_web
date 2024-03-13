import { Button, Modal } from "react-bootstrap"
import s from "./ListItem.module.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import UpdateNode from "../../UpdateNode/UpdateNode"
import AddLog from "../../NodeProfile/AddLog/AddLog"

const ListItem = ({ addLog, isAuth, id, statement, guid, mac, ip, who, rack, shelf, position, loggedUserInfo, showToastMessage, updateNode }) => {
    const navigate = useNavigate()

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);

    const [showAddLog, setShowAddLog] = useState(false);
    const handleCloseAddLog = () => setShowAddLog(false);
    const handleShowAddLog = () => setShowAddLog(true);

    let emoji = ""
    switch (statement) {
        case "умер":
            emoji = "🔴"
            break;
        case "работает":
            emoji = "🟢"
            break;
        case "нужно обслужить":
            emoji = "🟡"
            break;
        case "ожидает возврата":
            emoji = "🔵"
            break;
        case "ожидает ремонта":
            emoji = "🟠"
            break;
        case "готов к установке":
            emoji = "🟣"
            break;
        default:
            break;
    }

    const currentNode = {
        id,
        mac,
        guid,
        ip,
        statement,
        who,
        shelf,
        rack,
        position
    }

    const navigateTo = () => {
        navigate(`/node/${id}`)
    }

    return (
        <tr className={s.listItem}>
            <td className={`${s.itemId} ${s.listItemData}`} onClick={navigateTo}>
                <b>{emoji + id}</b>{` (${rack}.${shelf}.${position})`}
            </td>
            <td className={`${s.itemState} ${s.listItemData}`}>
                <u><b>{statement || "--------"}</b></u>
            </td>
            <td className={`${s.itemComment} ${s.listItemData}`}>
                {who || "--------"}
            </td>
            <td className={`${s.itemGuid} ${s.listItemData}`}>
                <i>{guid || "--------"}</i>
            </td>
            <td className={`${s.itemMac} ${s.listItemData}`}>
                <i>{mac || "--------"}</i>
            </td>
            <td className={`${s.itemIp} ${s.listItemData}`}>
                <i>{ip || "--------"}</i>
            </td>
            <td style={{ display: "flex", gap: "20px" }}>
                <Modal onHide={handleCloseAddLog} data-bs-theme="dark" show={showAddLog} style={{ color: "white" }} >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddLog buttonWidth={"40%"} showToastMessage={showToastMessage} isAuth={isAuth} addLog={addLog} {...currentNode} loggedUserInfo={loggedUserInfo}/>
                    </Modal.Body>
                </Modal>
                <Button onClick={() => handleShowInfo()}>Редактировать</Button>
                <Button onClick={() => handleShowAddLog()}>Добавить лог</Button>
                <UpdateNode updateNode={updateNode} currentNode={currentNode} isAuth={isAuth} showToastMessage={showToastMessage} loggedUserInfo={loggedUserInfo} currentNode={currentNode} showInfo={showInfo} handleCloseInfo={() => handleCloseInfo()} />
            </td>

        </tr>
    )
}

export default ListItem;