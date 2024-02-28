import s from "./ListItem.module.css"
import {useNavigate} from "react-router-dom"

const ListItem = ({id, state, guid, mac, ip, who, rack, shelf, position}) => {
    const navigate = useNavigate()
    let emoji = ""
    switch (state) {
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

    return (
        <tr className={s.listItem} onClick={() => navigate(`/node/${id}`)}>
                <td className={`${s.itemId} ${s.listItemData}`}>
                    <b>{emoji + id}</b>{` (${rack}.${shelf}.${position})`}
                </td>
                <td className={`${s.itemState} ${s.listItemData}`}>
                    <u><b>{state || "--------"}</b></u>
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
        </tr>
    )
}

export default ListItem;