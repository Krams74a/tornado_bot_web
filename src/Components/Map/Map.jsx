import ServerContent from "./ServerContent/ServerContent";
import s from "./Map.module.css"
import { compose } from "redux";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "../../redux/app-reducer";
import React, { useState } from "react"
import EditModePageContainer from "./EditModePage/EditModePage";
import { addSelectedNode, deleteSelectedNode } from "../../redux/nodes-reducer";
import { Button, Card, CloseButton } from "react-bootstrap";
import { RxUpdate } from "react-icons/rx";
import Buttons from "./Buttons/Buttons";

const Map = (props) => {
     

     return (
          <div className={s.serversPage}>
               {!props.editListMode && <Buttons {...props} />}
               <div className={s.servers}>
                    <div className={s.server}>
                         {props.racks && [...props.racks].map((rack, index) => (
                              <ServerContent type={props.type} deleteSelectedNode={props.deleteSelectedNode} addSelectedNode={props.addSelectedNode} rackNumber={index} key={uuidv4()} rack={rack} editMode={props.editMode}></ServerContent>
                         ))
                         }
                    </div>
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
