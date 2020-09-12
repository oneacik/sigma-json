import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { JSONNode } from "./react/JSONNode";
import { Node, PossibleTypes } from "./utils/ToTree";

function $(
  id,
  value,
  enumerable?: boolean | undefined,
  type?: PossibleTypes | undefined,
  selected: boolean = false
) {
  return {
    params: {
      id,
      expanded: false,
      selected,
      ...(enumerable !== undefined ? { enumerable } : {}),
      ...(type !== undefined ? { type } : {}),
    },
    value,
  };
}

const sampleTree = observable({
  x: $("root", [$("door", "knob", false, "value")], true, "object") as Node,
});

ReactDOM.render(
  <div>
    <JSONNode node={sampleTree.x} />
  </div>,
  document.getElementById("root")
);
