import { useNavigate } from "react-router-dom"
import s from "./Node.module.css"
import 'react-tooltip/dist/react-tooltip.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Node = ({ id, state, guid, mac, ip, who, rack, shelf, position }) => {
     const navigate = useNavigate();

     const navigateToNode = (nodeId) => {
          navigate("/node/" + nodeId)
     }

     const changeMarginOnOver = (event) => {
          event.target.style.margin = '2px';
     }

     const changeMarginOnLeave = (event) => {
          event.target.style.margin = '1px';
     }

     let nodeName = id ? id.slice(4) : ""

     const dead = state === "умер" ? s.dead : ""
     const working = state === "работает" ? s.working : ""
     const need_repair = state === "нужно обслужить" ? s.need_repair : ""
     const need_return = state === "ожидает возврата" ? s.need_return : ""
     const ready_to_set = state === "готов к установке" ? s.ready_to_set : ""
     const waiting_repair = state === "ожидает ремонта" ? s.waiting_repair : ""

     return (
<Tippy content={<div className={s.tooltip}>
                         <div><b>{`${nodeName} (${rack}.${shelf}.${position})`}</b></div>
                         <div><u>{state}</u></div>
                         <div>{who}</div>
                    </div>}>
                    <div
               onMouseLeave={changeMarginOnLeave}
               onMouseOver={changeMarginOnOver}
               onClick={() => navigateToNode(id)}
               className={`
          ${s.tooltipTrigger}
          ${s.node} 
          ${dead} 
          ${working} 
          ${need_repair} 
          ${need_return} 
          ${ready_to_set} 
          ${waiting_repair}`}>
               {nodeName}
          </div>
               </Tippy>
          

     )
}

export default Node