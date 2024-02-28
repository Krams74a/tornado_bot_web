import NodeRack from "./NodeRack/NodeRack";
import s from "./Nodes.module.css";
import { v4 as uuidv4 } from 'uuid';

const Nodes = (props) => {
     return <div className={s.nodes}>
          {[...props.rack].map(shelf => {
               return <NodeRack deleteSelectedNode={props.deleteSelectedNode} addSelectedNode={props.addSelectedNode} key={uuidv4()} shelf={shelf} editMode={props.editMode}></NodeRack>
          })}
     </div>;
};

export default Nodes;
