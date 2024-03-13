import s from "./App.module.css"
import { v4 as uuidv4 } from 'uuid';
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
import MyListsContainer from "../MyLists/MyLists";
import { getLists } from "../../redux/lists-reducer";
import ListsContainer from "../Lists/Lists";
import EditListContainer from "../EditList/EditList";

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
          if (!this.props.initialized && this.props.userLists) return <div style={{ color: "white" }}>Loading...</div>
          return (
               <div className={s.app}>
                    <HeaderContainer />
                    
                    <div className={s.content}>
                    <ToastContainer />
                         <Routes>
                              <Route path="" element={<MapContainer />} />
                              <Route path="list" element={<NodesListContainer showToastMessage={this.showToastMessage} />} />
                              <Route path="map" element={<MapContainer showToastMessage={this.showToastMessage} />} />
                              <Route path="diagram" element={<DiagramPageContainer />} />
                              <Route path="node/:id" element={<NodeProfileContainer showToastMessage={this.showToastMessage} />} />
                              <Route path="login" element={<LoginContainer />} />
                              <Route path="editPage" element={<EditSelectedNodesPageContainer showToastMessage={this.showToastMessage} />} />
                              <Route path="myLists" element={<MyListsContainer showToastMessage={this.showToastMessage}/>} />
                              <Route path="lists" element={<ListsContainer showToastMessage={this.showToastMessage}/>} />
                              <Route path="editList/:name" element={<EditListContainer showToastMessage={this.showToastMessage}/>} />
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
          logsInfo: state.nodes.logsInfo,
          userLists: state.lists.userLists,
          username: state.auth.loggedUserInfo.username
     }
}

const AppContainer = connect(mapStateToProps, { initializeApp, login, getLists })(App)


export default AppContainer;