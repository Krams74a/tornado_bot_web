import React from "react";
import s from "./Buttons.module.css"
import { Button, CloseButton, Card } from "react-bootstrap";
import { useState } from "react";
import EditModePageContainer from "../EditModePage/EditModePage";
import { RxUpdate } from "react-icons/rx";

const Buttons = (props) => {
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
        <div className={s.buttons}>
                    <div className={s.updateButton}>
                         <Button onClick={updatePage}>Обновить <RxUpdate /></Button>
                    </div>
                    <EditModePageContainer />
                    <Card bg="dark" style={{ color: "white", padding: "10px", display: "flex", flexDirection: "row", gap: "20px" }} className={s.bottomInfo}>
                         <div>🔴 Умер</div>
                         <div>🟢 Работает</div>
                         <div>🟡 Нужно обслужить</div>
                         <div>🟠 Ожидает ремонта</div>
                         <div>🟣 Готов к установке</div>
                         <div>🔵 Ожидает возврата</div>
                    </Card>
                    <div className={s.updateInfo} style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                         Последнее обновление карты: {updateTime}
                    </div>
               </div>
    )
}

export default Buttons