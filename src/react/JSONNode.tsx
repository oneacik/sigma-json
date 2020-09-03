import * as React from "react";
import { Node } from "../utils/ToTree";

export function JSONNode(props: JSONNodeProps) {
  return (
    <div>
      <div>{props.node.params.id}</div>
    </div>
  );
}

interface JSONNodeProps {
  node: Node
}

