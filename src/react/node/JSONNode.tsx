import * as React from "react";
import { observer } from "mobx-react";
import { Node } from "../../utils/ToTree";
import "./JSONNodeStyle.css";

export function renderValue(input: Node): string {
  switch (input.params.type) {
    case "object":
      return "{}";
    case "array":
      return "[]";
    case "value":
      return input.value as string;
  }
}

export const JSONNode = observer(({ node }: JSONNodeProps) => {
  return (
    <div>
      <div className={"element"}>
        <div
          onClick={() =>
            node.params.enumerable &&
            (node.params.expanded = !node.params.expanded)
          }
          className={"expander"}
        >
          {node.params.enumerable ? (node.params.expanded ? "➖" : "➕") : "◾"}
        </div>
        <div className={"name"}>{node.params.id}:</div>
        <div className={"value"}>{renderValue(node)}</div>
      </div>
      <div className={"elements"}>
        {node.params.expanded &&
          (node.value as Node[]).map((childNode) => (
            <JSONNode key={childNode.params.id} node={childNode} />
          ))}
      </div>
    </div>
  );
});

interface JSONNodeProps {
  node: Node;
}
