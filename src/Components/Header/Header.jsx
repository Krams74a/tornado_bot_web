import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import s from "./Header.module.css"
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
     const navigate = useNavigate()
     const location = useLocation();

     const activeLink = location.pathname.split("/")[1];

     return (
          <header className={s.header}>
               <div className={s.name}>
                    NODES
               </div>
               <div className={s.links}>
                    <div className={`${s.nodesLink} ${activeLink === "map" || activeLink === ""? s.active : ""}`} onClick={() => {
                         navigate("/map")
                    }}>
                         Карта
                    </div>
                    <div className={`${s.nodesLink} ${activeLink === "list" ? s.active : ""}`} onClick={() => {
                         navigate("/list")
                    }}>
                         Список
                    </div>
                    <div className={`${s.nodesLink} ${activeLink === "diagram" ? s.active : ""}`} onClick={() => {
                         navigate("/diagram")
                    }}>
                         Бублик
                    </div>
               </div>
          </header>
     );
};

export default Header;
