import ListItem from "./ListItem/ListItem"
import { connect } from "react-redux"
import Table from 'react-bootstrap/Table';
import { compose } from "redux";
import { updateNode } from "../../redux/nodes-reducer";
import { addLog } from "../../redux/nodes-reducer";
import { Button, Form, Card } from "react-bootstrap";
import { useState } from "react";
import ListFilter from "./ListFilter/ListFilter";

const NodesList = ({nodesList, updateNode, isAuth, loggedUserInfo, showToastMessage, addLog}) => {
    const refactorNodesFromSearch = () => {
        let nodeList = searchFilter.replace(" ", "").split(",")
        let outputList = []
        nodeList.forEach(node => {
            if (node.includes("-")) {
                for (let nodeId = parseInt(node.split("-")[0]); nodeId <= parseInt(node.split("-")[1]); nodeId++) {
                    if (!(nodeId <= 0 || nodeId > 480)) {
                        outputList.push('0'.repeat((3 - nodeId.toString().length)) + nodeId.toString())
                    }
                }
            } else {
                if (!(parseInt(node) <= 0 || parseInt(node) > 480)) {
                    outputList.push('0'.repeat((3 - node.length)) + node)
                }
            }
        })
        let sortedList = outputList.sort((a, b) => parseInt(a) - parseInt(b))
        return sortedList
    }

    const [statementFilter, setStatementFilter] = useState("")
    const [directionFilter, setDirectionFilter] = useState("normal")

    const [searchFilter, setSearchFilter] = useState("")

    const handlerStatementFilter = (statement) => setStatementFilter(statement)
    const handlerDirectionFilter = (direction) => setDirectionFilter(direction)
    const handlerSearchFilter = (search) => setSearchFilter(search)

    const filterNodes = () => {
        let filteredNodesList = []
        if (searchFilter === "") {
            filteredNodesList = nodesList.filter((node) => statementFilter !== "" ? node.statement === statementFilter : node)
        } else {
            let nodesList = refactorNodesFromSearch()
            filteredNodesList = nodesList.filter((node) => statementFilter !== "" 
            ? node.statement === statementFilter && (nodesList.includes(node.id.replace("node", "")))
            : node && (nodesList.includes(node.id.replace("node", ""))))
        }
        let outputNodesList = []
        if (directionFilter === "reverse") {
            outputNodesList = filteredNodesList.reverse().map((node, index) => {
                return (<ListItem key={index} id={node.id}
                    statement={node.statement}
                    mac={node.mac}
                    ip={node.ip}
                    guid={node.guid}
                    who={node.who}
                    rack={node.rack}
                    shelf={node.shelf}
                    position={node.position}
                    updateNode={updateNode}
                    type={"list"}
                    isAuth={isAuth}
                    loggedUserInfo={loggedUserInfo}
                    showToastMessage={showToastMessage}
                    addLog={addLog}
                ></ListItem>)
            })
        } else {
            outputNodesList = filteredNodesList.map((node, index) => {
                return (<ListItem key={index} id={node.id}
                    statement={node.statement}
                    mac={node.mac}
                    ip={node.ip}
                    guid={node.guid}
                    who={node.who}
                    rack={node.rack}
                    shelf={node.shelf}
                    position={node.position}
                    updateNode={updateNode}
                    type={"list"}
                    isAuth={isAuth}
                    loggedUserInfo={loggedUserInfo}
                    showToastMessage={showToastMessage}
                    addLog={addLog}
                ></ListItem>)
            })
        }
        if (outputNodesList.length > 0) {
            showToastMessage("info", `Найдено ${outputNodesList.length} узлов`)
        }
        return outputNodesList
    }
    if (nodesList.length === 0) {
        return (
            <div>
                Loading
            </div>
        )
    } else {


    return (
        <div style={{width: "100%"}}>
            <ListFilter 
            setStatementFilter={(statement) => handlerStatementFilter(statement)}
            statementFilter={statementFilter}
            setDirectionFilter={(direction) => handlerDirectionFilter(direction)}
            directionFilter={directionFilter}
            setSearchFilter={(search) => handlerSearchFilter(search)}
            searchFilter={searchFilter}
             />
            <Table bordered hover variant="dark" responsive style={{ width: "95%" }}>
                <thead>
                    <tr>
                        <th>NodeId</th>
                        <th>Состояние</th>
                        <th>Комментарий</th>
                        <th>GUID</th>
                        <th>MAC</th>
                        <th>IP</th>
                        <th>Кнопки</th>
                    </tr>
                </thead>
                <tbody>
                    {filterNodes()}
                </tbody>
            </Table>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        nodesList: state.nodes.nodesList,
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const NodesListConatiner = compose(connect(mapStateToProps, { updateNode, addLog }))(NodesList)

export default NodesListConatiner