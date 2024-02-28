import ServerContent from "./ServerContent/ServerContent";
import s from "./Map.module.css"
import { compose } from "redux";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "../../redux/app-reducer";
import React from "react"
import EditModePageContainer from "./EditModePage/EditModePage";
import { addSelectedNode, deleteSelectedNode } from "../../redux/nodes-reducer";
import { Button } from "react-bootstrap";
import { RxUpdate } from "react-icons/rx";

const Map = (props) => {
     const now = new Date();
     let hours = now.getHours().toString()
     let minutes = now.getMinutes().toString()
     if (minutes.length === 1) {
          minutes = "0" + minutes
     }
     let updateTime = hours + ":" + minutes

     
          

     const updatePage = () => {
          let isSuccess = props.initializeApp()
          console.log(isSuccess)
          props.showToastMessage("info", "Страница успешно обновлена")
     }

     return (
          <div className={s.serversPage}>
               <div className={s.buttons}>
                    <div className={s.updateButton}>
                         <Button onClick={updatePage}>Обновить <RxUpdate/></Button>
                    </div>
                    <EditModePageContainer />
               </div>
               
               <div className={s.servers}>
                    <div className={s.server}>
                         {props.racks && [...props.racks].map((rack, index) => (
                              <ServerContent deleteSelectedNode={props.deleteSelectedNode} addSelectedNode={props.addSelectedNode} rackNumber={index} key={uuidv4()} rack={rack} editMode={props.editMode}></ServerContent>
                         ))
                         }
                    </div>
               </div>
               <div className={s.bottomInfo}>
                    <div className={s.legend}>
                         <span>🔴 Умер</span>
                         <span>🟢 Работает</span>
                         <span>🟡 Нужно обслужить</span>
                         <span>🟠 Ожидает ремонта</span>
                         <span>🟣 Готов к установке</span>
                         <span>🔵 Ожидает возврата</span>
                    </div>
                    <span className={s.updateInfo}>
                         Последнее обновление страницы: {updateTime}
                    </span>
               </div>
          </div>
     );
};

const mapStateToProps = (state) => {
     return {
          racks: state.nodes.racks,
          logsInfo: state.nodes.logsInfo,
          isAuth: state.auth.isAuth,
          editMode: state.nodes.editMode
     }
}

const MapContainer = compose(connect(mapStateToProps, { initializeApp, addSelectedNode, deleteSelectedNode }))(Map);

export default MapContainer;
