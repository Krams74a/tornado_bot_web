import ListItem from "./ListItem/ListItem"
import { connect } from "react-redux"
import Table from 'react-bootstrap/Table';
import { compose } from "redux";

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
                {[...props.nodesList.reverse()].map((node, index) => {
                    return <ListItem key={index} id={node.id} 
                    state={node.statement} 
                    mac={node.mac} 
                    ip={node.ip} 
                    guid={node.guid} 
                    who={node.who}
                    rack={node.rack}
                    shelf={node.shelf}
                    position={node.position}></ListItem>
                })}
            </tbody>
        </Table>
    )
}

const mapStateToProps = (state) => {
    return {
        nodesList: state.nodes.nodesList,
        isAuth: state.auth.isAuth
    }
}

const NodesListConatiner = compose(connect(mapStateToProps, {}))(NodesList)

export default NodesListConatiner