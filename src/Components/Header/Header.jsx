import { useNavigate, useLocation } from "react-router-dom";
import s from "./Header.module.css"
import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { Dropdown, SplitButton } from "react-bootstrap";
import React from "react";

const Header = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    console.log("RERENDER")
    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" style={{ backgroundColor: "#424242" }}>
            <Container style={{ maxWidth: "95%" }}>
                <Navbar.Brand as={NavLink} style={{ color: "white" }} to={`/map`}>Леночка</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Button onClick={() => navigate("/map")}
                            className={`nav-link ${s.activeLink}`} style={{ marginLeft: "20%", marginRight: "7px", color: "white", borderRadius: "0px", borderBottom: `${path === "map" ? "2px solid white" : ""}` }}>Карта</Button>
                        <Button onClick={() => navigate("/list")} className={`nav-link`}
                            style={{ marginRight: "7px", color: "white", borderRadius: "0px", borderBottom: `${path === "list" ? "2px solid white" : ""}` }}>Список</Button>
                        <Button onClick={() => navigate("/diagram")} className={`nav-link`}
                            style={{ marginRight: "7px", color: "white", borderRadius: "0px", borderBottom: `${path === "diagram" ? "2px solid white" : ""}` }}>Бублик</Button>
                    </Nav>
                    <Nav>
                        {props.loggedUserInfo.username ? <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                {props.loggedUserInfo.username}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={props.logout}>Выйти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> : <Button variant={"dark"} onClick={() => navigate('/login')}>Войти</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        loggedUserInfo: state.auth.loggedUserInfo
    }
}

const HeaderContainer = connect(mapStateToProps, { logout })(Header)

export default HeaderContainer;
