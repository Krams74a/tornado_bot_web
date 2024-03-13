import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import ListBlock from "./ListBlock"
import { getLists, deleteList } from "../../redux/lists-reducer"
import { Alert, Button } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import { setSelectedNodes } from "../../redux/nodes-reducer"

const MyLists = ({userLists, worker, deleteList, showToastMessage, setSelectedNodes}) => {

    console.log(userLists)
    if (userLists.length === 0) {
        return <Alert variant="warning" style={{width: "50%"}}>
            У вас ещё нет списков. 
            <div>Для того чтобы их создать нажмите на карте с узлами кнопку "Редактировать", затем выделите необходимые узлы и подтвердите выбор.</div> 
            <div>На следующей странице нажмите на кнопку "Сохранить список"</div>
        </Alert>
    }
    else {
        return (
            <div style={{ display: "flex", width: "90%", gap: "20px", flexDirection: "column" }}>
                {[...userLists].map((list, index) => {
                    return (
                        <ListBlock key={uuidv4()} list={list} worker={worker} deleteList={deleteList} showToastMessage={showToastMessage} setSelectedNodes={setSelectedNodes}/>
                    )
                })}
            </div>
        )
    }
        

}

const mapStateToProps = (state) => {
    return {
        userLists: state.lists.userLists,
        initialized: state.app.initialized,
        worker: state.auth.loggedUserInfo.username,
        isLoaded: state.lists.isLoaded
    }
}

const MyListsContainer = connect(mapStateToProps, {getLists, deleteList, setSelectedNodes})(MyLists)

export default MyListsContainer