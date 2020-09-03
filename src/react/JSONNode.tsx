import * as React from "react";
import { Node } from "../utils/ToTree";

React.Component;

export function JSONNode(props: JSONNodeProps) {
  return (
    <div>
      <div className={"element"}>
        <div
          onClick={() => props.node.params.expanded = !props.node.params.expanded}
          className={"expander"}
        >+</div>
        <div className={"name"}>{props.node.params.id}</div>
      </div>
      <div className={"elements"}>
        {props.node.params.enumerable && (props.node.value as Node[]).map(node => <JSONNode node={node}/>)}
      </div>
    </div>
  );
}

interface JSONNodeProps {
  node: Node
}

