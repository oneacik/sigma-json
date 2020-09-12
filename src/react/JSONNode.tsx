import * as React from "react";
import { observer } from "mobx-react";
import { Node } from "../utils/ToTree";

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

export const JSONNode = observer((props: JSONNodeProps) => (
  <div>
    <div className={"element"}>
      {props.node.params.enumerable && (
        <div
          onClick={() =>
            (props.node.params.expanded = !props.node.params.expanded)
          }
          className={"expander"}
        >
          +
        </div>
      )}
      <div className={"name"}>{props.node.params.id}</div>
      <div className={"value"}>{renderValue(props.node)}</div>
    </div>
    <div className={"elements"}>
      {props.node.params.expanded &&
        (props.node.value as Node[]).map((node) => (
          <JSONNode key={props.node.params.id} node={node} />
        ))}
    </div>
  </div>
));

interface JSONNodeProps {
  node: Node;
}
