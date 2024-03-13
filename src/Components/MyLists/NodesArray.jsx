import React from "react";
import Node from "../Map/ServerContent/Nodes/NodeRack/Node/Node"
import { v4 as uuidv4 } from 'uuid';

const NodesArray = ({id, statement, who, rack, shelf, position}) => {
    return (
        <div key={uuidv4()} style={{ display: "flex", flexWrap: "wrap", width: "40px", height: "30px" }}>
            <Node key={uuidv4()} who={who} rack={rack} shelf={shelf} position={position} id={id} statement={statement}></Node>
        </div>
    )
}

export default NodesArray