import Tippy from "@tippyjs/react";
import Blocks from "./Blocks/Blocks"
import Nodes from "./Nodes/Nodes"
import s from "./ServerContent.module.css"

const ServerContent = (props) => {
     let workingCount = 0

     props.rack.forEach(shelf => {
          shelf.forEach(node => {

               if (node.statement === "работает") {
                    workingCount++
               }
          });
     });
     let notWorkingCount = 48 - workingCount
     return (
          <div>
               <div className={s.rackNumber}>
                    <div>
                         <b>{`${props.rackNumber + 1} шкаф`}</b>
                    </div>
                    <div className={s.counter}>
                         <div className={s.workingCount}>
                              {`${workingCount}`}
                              <Tippy content=
                                   {<div className={s.tooltip}>
                                        В работе
                                   </div>
                                   }>
                                   <span>
                                        🟢
                                   </span>
                              </Tippy>
                         </div>

                         <div className={s.notWorkingCount}>
                              {`${notWorkingCount}`}
                              <Tippy content=
                                   {<div className={s.tooltip}>
                                        Не в работе
                                   </div>
                                   }>
                                   <span>
                                        🔴
                                   </span>
                              </Tippy>
                         </div>
                    </div>
               </div>
               <div className={s.serverContent}>
                    {props.type && props.type === "small" || <Blocks></Blocks>}
                    <Nodes deleteSelectedNode={props.deleteSelectedNode} rack={props.rack} editMode={props.editMode} addSelectedNode={props.addSelectedNode}></Nodes>
               </div>
          </div>
     );
};
//
export default ServerContent;
