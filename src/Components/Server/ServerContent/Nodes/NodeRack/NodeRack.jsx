import Node from "./Node/Node";
import s from "./NodeRack.module.css";

const NodeRack = (props) => {
     return (
          <div className={s.nodeRack}>
               {[...props.shelf].map((node, index) => {
               return <Node 
               key={index} 
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
