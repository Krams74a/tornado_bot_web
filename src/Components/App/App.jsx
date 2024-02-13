import Header from '../Header/Header';
import s from "./App.module.css"
import Server from "../Server/Server"
import store from "../../redux/store-redux"
import { connect, Provider } from "react-redux";
import React from "react"
import { initializeApp } from "../../redux/app-reducer"
import ServerContainer from '../Server/Server';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NodeProfileContainer from '../NodeProfile/NodeProfile';
import NodesListContainer from "../NodesList/NodesList"
import DiagramPageContainer from '../DiagramPage/DiagramPage';

class App extends React.Component {
     componentDidMount() {
          this.props.initializeApp()
     }
     render() {
          if (!this.props.initialized && !this.props.logsInfo) {
               return <div style={{color: "white"}}>Loading...</div>
          } else {
               return (
                    <React.StrictMode>
                    <BrowserRouter>
                         <div className={s.app}>
                              <Header></Header>
                              <div className={s.content}>
                                   <Routes>
                                        <Route path="" element={<ServerContainer />} />
                                        <Route path="list" element={<NodesListContainer />} />
                                        <Route path="map" element={<ServerContainer />} />
                                        <Route path="diagram" element={<DiagramPageContainer />} />
                                        <Route path="node/:id" element={<NodeProfileContainer />} />
                                   </Routes>
                              </div>
                         </div>
                    </BrowserRouter>
                    </React.StrictMode>
               )
          }
          
     }
}

const mapStateToProps = (state) => {
     return {
          initialized: state.app.initialized,
          logsInfo: state.nodes.logsInfo
     }
}

const AppContainer = connect(mapStateToProps, { initializeApp })(App)


export default AppContainer;