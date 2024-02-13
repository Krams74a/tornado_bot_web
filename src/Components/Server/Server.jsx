import ServerContent from "./ServerContent/ServerContent";
import s from "./Server.module.css"
import { compose } from "redux";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import LogBlock from "../NodeProfile/LogBlock/LogBlock";
import { getNodes } from "../../redux/nodes-reducer"
import { initializeApp } from "../../redux/app-reducer";
import React from "react"
import { useEffect } from "react";



const Server = (props) => {
     console.log(props)
     useEffect(() => {
          props.initializeApp()
     }, [])


     const now = new Date();
     let hours = now.getHours().toString()
     let minutes = now.getMinutes().toString()
     if (minutes.length == 1) {
          minutes = "0" + minutes
     }
     let updateTime = hours + ":" + minutes



     return (
          <div className={s.serversPage}>
               <div className={s.servers}>
                    <div className={s.server}>
                         {props.racks && [...props.racks].map((rack, index) => (
                              <ServerContent rackNumber={index} key={uuidv4()} rack={rack}></ServerContent>
                         ))
                         }
                         {/*<div className={s.logsPage}>
                              {[...props.logsInfo].map((log) => {
                                   return <LogBlock {...log} />
                              })}
                         </div>*/}
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
          logsInfo: state.nodes.logsInfo
     }
}

const ServerContainer = compose(connect(mapStateToProps, { initializeApp }))(Server)

export default ServerContainer;
