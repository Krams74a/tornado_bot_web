import s from "./App.module.css"
import { connect } from "react-redux";
import React from "react"
import { initializeApp } from "../../redux/app-reducer"
import { Routes, Route, Navigate } from 'react-router-dom';
import NodeProfileContainer from '../NodeProfile/NodeProfile';
import NodesListContainer from "../NodesList/NodesList"
import DiagramPageContainer from '../DiagramPage/DiagramPage';
import { login } from '../../redux/auth-reducer';
import LoginContainer from '../Login/Login';
import HeaderContainer from '../Header/Header';
import MapContainer from "../Map/Map";
import EditSelectedNodesPageContainer from "../EditSelectedNodesPage/EditSelectedNodesPage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
     componentDidMount() {
          this.props.initializeApp()
     }

     showToastMessage(messageType, messageText) {
          switch (messageType) {
               case "success":
                    toast.success(messageText, { theme: "dark" });
                    break;
               case "info":
                    toast.info(messageText, { theme: "dark" });
                    break;
               case "warning":
                    toast.warning(messageText, { theme: "dark" });
                    break;
               case "error":
                    toast.error(messageText, { theme: "dark" });
                    break;
               default:
                    break;
          }
     }

     render() {
          if (!this.props.initialized) return <div style={{ color: "white" }}>Loading...</div>
          return (
               <div className={s.app}>
                    <HeaderContainer />
                    <ToastContainer />

                    <div className={s.content}>
                         <Routes>
                              <Route path="" element={<MapContainer />} />
                              <Route path="list" element={<NodesListContainer />} />
                              <Route path="map" element={<MapContainer showToastMessage={this.showToastMessage} />} />
                              <Route path="diagram" element={<DiagramPageContainer />} />
                              <Route path="node/:id" element={<NodeProfileContainer showToastMessage={this.showToastMessage} />} />
                              <Route path="login" element={<LoginContainer />} />
                              <Route path="editPage" element={<EditSelectedNodesPageContainer showToastMessage={this.showToastMessage} />} />
                              <Route path="*" element={<Navigate replace to="/map" />} />
                         </Routes>
                    </div>
               </div>
          )
     }
}

const mapStateToProps = (state) => {
     return {
          initialized: state.app.initialized,
          isAuth: state.auth.isAuth,
          logsInfo: state.nodes.logsInfo
     }
}

const AppContainer = connect(mapStateToProps, { initializeApp, login })(App)


export default AppContainer;