import { useState } from "react";
import s from "./ListItem.module.css"
import Table from 'react-bootstrap/Table';

const ListItem = (props) => {
    console.log(props)

    let emoji = ""
    switch (props.statement) {
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
    }

    return (
        <tr className={s.listItem}>
                <td className={`${s.itemId} ${s.listItemData}`}>
                    <b>{emoji + props.id}</b>{` (${props.rack}.${props.shelf}.${props.position})`}
                </td>
                <td className={`${s.itemState} ${s.listItemData}`}>
                    <u><b>{props.statement || "--------"}</b></u>
                </td>
                <td className={`${s.itemComment} ${s.listItemData}`}>
                    {props.who || "--------"}
                </td>
                <td className={`${s.itemGuid} ${s.listItemData}`}>
                    <i>{props.guid || "--------"}</i>
                </td>
                <td className={`${s.itemMac} ${s.listItemData}`}>
                    <i>{props.mac || "--------"}</i>
                </td>
                <td className={`${s.itemIp} ${s.listItemData}`}>
                    <i>{props.ip || "--------"}</i>
                </td>
        </tr>
    )
}

export default ListItem;