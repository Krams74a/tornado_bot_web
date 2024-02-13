import Blocks from "./Blocks/Blocks"
import Nodes from "./Nodes/Nodes"
import s from "./ServerContent.module.css"

const ServerContent = (props) => {
     console.log(props.rack)
     let workingCount = 0
     
     props.rack.forEach(shelf => {
          shelf.forEach(node => {
               console.log(node)
               if (node.statement == "работает") {
                    workingCount++
               }
          });
     });
     let notWorkingCount = 48 - workingCount
     console.log(workingCount, notWorkingCount)
     return (
          <div>
               <div className={s.rackNumber}>
                    <div>
                         <b>{`${props.rackNumber + 1} шкаф`}</b>
                    </div>
                    <div className={s.workingCount}>
                         {`${workingCount}🟢 ${notWorkingCount}🔴`}
                    </div>
               </div>
               <div className={s.serverContent}>
                    <Blocks></Blocks>
                    <Nodes rack={props.rack}></Nodes>
               </div>
          </div>
     );
};

export default ServerContent;
