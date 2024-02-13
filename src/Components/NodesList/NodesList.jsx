import ListItem from "./ListItem/ListItem"
import s from "./NodesList.module.css"
import { connect } from "react-redux"
import Table from 'react-bootstrap/Table';

/*const NodesList = (props) => {
    return (
        <div>
            <div className={s.listTitle}>
                <div className={`${s.itemId} ${s.listTitleItemData}`}>
                    <b>nodeInfo</b>
                </div>
                <div className={`${s.itemState} ${s.listTitleItemData}`}>
                    <u><b>Состояние</b></u>
                </div>
                <div className={`${s.itemComment} ${s.listTitleItemData}`}>
                    Комментарий
                </div>
                <div className={`${s.itemGuid} ${s.listTitleItemData}`}>
                    <i>GUID </i>
                </div>
                <div className={`${s.itemMac} ${s.listTitleItemData}`}>
                    <i> MAC </i>
                </div>
                <div className={`${s.itemIp} ${s.listTitleItemData}`}>
                    <i>IP </i>
                </div>
            </div>
            
        </div>
    )
}*/

const NodesList = (props) => {
    return (
        <Table bordered hover variant="dark" responsive style={{width: "95%"}}>
            <thead>
                <tr>
                    <th>NodeId</th>
                    <th>Состояние</th>
                    <th>Комментарий</th>
                    <th>GUID</th>
                    <th>MAC</th>
                    <th>IP</th>
                </tr>
            </thead>
            <tbody>
                {[...props.nodesList.reverse()].map((list_item) => {
                    return <ListItem {...list_item}></ListItem>
                })}
            </tbody>
        </Table>
    )
}

const mapStateToProps = (state) => {
    return {
        nodesList: state.nodes.nodesList
    }
}

const NodesListConatiner = connect(mapStateToProps, {})(NodesList)

export default NodesListConatiner