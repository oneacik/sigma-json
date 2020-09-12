import * as React from "react";
import { observer } from "mobx-react";
import { Node } from "../../utils/ToTree";

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
  console.warn("XD");
  return (
    <div>
      <div className={"element"}>
        {node.params.enumerable && (
          <div
            onClick={() => (node.params.expanded = !node.params.expanded)}
            className={"expander"}
          >
            +
          </div>
        )}
        <div className={"name"}>{node.params.id}</div>
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
