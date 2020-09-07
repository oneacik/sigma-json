import { Node } from "./ToTree";

export type NodeStripped = {
  [P in "params" | "value"]: P extends "params"
    ? Pick<Node[P], "selected">
    : Node[P];
};

// NON PURE!
export function reset(elem: NodeStripped) {
  elem.params.selected = false;
}

type SelectableNode<K extends keyof T, T = Node> = {
  [P in K]: T[P];
};
