import s from "./EditModePage.module.css"
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setEditMode } from "../../../redux/nodes-reducer";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearSelectedNodes } from "../../../redux/nodes-reducer";

const EditModePage = (props) => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const acceptButtonOnClick = () => {
    if (props.editMode) {
      props.setEditMode(false)
      navigate("/editPage")
    } else {
      props.clearSelectedNodes()
      props.setEditMode(true)
      handleCloseInfo()
    }
  }

  return (
    <div className={s.editPage}>
      {
        <Button variant={props.editMode ? "danger" : "primary"} onClick={() => { handleShowInfo() }}>
          {props.editMode ? "Завершить" : "Редактировать"}
        </Button>

      }
      {
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal show={showInfo} onHide={handleCloseInfo} data-bs-theme="dark" style={{ color: "white" }}>
            <Modal.Header>
              <Modal.Title>{props.editMode ? "Завершить выделение узлов" : "Режим выделения"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{wordWrap: "break-word"}}>
                {props.editMode ? `Вы выделили следующие узлы: ${props.editModeSelectedNodes.map(node => node.id.replace("node", ""))}` : "Вы вошли в режим выделения. Нажмите на нужные узлы."}
              </div></Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => { handleCloseInfo() }}>
                Отмена
              </Button>
              <Button variant="primary" onClick={acceptButtonOnClick}>
                {props.editMode ? "Подтвердить" : "Ладно"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    editMode: state.nodes.editMode,
    editModeSelectedNodes: state.nodes.editModeSelectedNodes
  }
}

const EditModePageContainer = connect(mapStateToProps, { setEditMode, clearSelectedNodes })(EditModePage)

export default EditModePageContainer