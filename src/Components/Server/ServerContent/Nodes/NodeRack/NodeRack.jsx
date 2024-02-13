import Node from "./Node/Node";
import s from "./NodeRack.module.css";
import { v4 as uuidv4 } from 'uuid';

const NodeRack = (props) => {
     return (
          <div className={s.nodeRack}>
               {[...props.shelf].map(node => {
               return <Node 
               key={node.id} 
               id={node.id} 
               state={node.statement} 
               mac={node.mac} 
               ip={node.ip} 
               guid={node.guid} 
               who={node.who}
               rack={node.rack}
               shelf={node.shelf}
               position={node.position}
              ></Node>
          })}
          </div>
     );
};

export default NodeRack;
