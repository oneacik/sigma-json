import * as React from "react";
import { Node } from "../utils/ToTree";

React.Component;

export function JSONNode(props: JSONNodeProps) {
  return (
    <div>
      <div>
        <span
          onClick={() => props.node.params.expanded = !props.node.params.expanded}
          className={"button"}>
          +
        </span>
        {props.node.params.id}</div>
    </div>
  );
}

interface JSONNodeProps {
  node: Node
}

