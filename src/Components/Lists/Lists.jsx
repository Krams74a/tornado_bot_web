import React from "react";
import { connect } from "react-redux";
import ListBlock from "../MyLists/ListBlock";
import { v4 as uuidv4 } from 'uuid';
import { setSelectedNodes } from "../../redux/nodes-reducer";
import { deleteList } from "../../redux/lists-reducer";
import { Alert } from "react-bootstrap";

const Lists = ({publicLists, showToastMessage, setSelectedNodes, deleteList, worker}) => {
    if (publicLists.length === 0) {
        return <Alert variant="warning" style={{width: "30%"}}>Здесь ещё нет публичных списков. Чтобы создать публичный список нужно при сохранении списка узлов поставить галочку на параметре "публичность"</Alert>
    }
    return (
        <div style={{ display: "flex", width: "90%", gap: "20px", flexDirection: "column" }}>
                {[...publicLists].map((list, index) => {
                    return (
                        <ListBlock key={uuidv4()} worker={worker} list={list} deleteList={deleteList} showToastMessage={showToastMessage} setSelectedNodes={setSelectedNodes}/>
                    )
                })}
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        publicLists: state.lists.publicLists,
        worker: state.auth.loggedUserInfo.username
    }
}

const ListsContainer = connect(mapStateToProps, {setSelectedNodes, deleteList})(Lists)

export default ListsContainer