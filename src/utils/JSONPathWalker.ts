import { Node } from "./ToTree";

export type NodeStripped = {
  [P in "params" | "value"]: P extends "params"
    ? Pick<Node[P], "selected">
    : Node[P];
};

// NON PURE!
export function reset(elem: NodeStripped) {
  elem.params.selected = false;
  if (elem.value instanceof Array) {
    elem.value.forEach(reset);
  }
}

function isCurrentPathMatching(
  jsonPath: (string | number)[][],
  currentPath: (string | number)[]
): Boolean {
  return !!jsonPath.find(
    (path) =>
      path.length === currentPath.length &&
      currentPath.reduce(
        (matches, value, index) => matches && path[index] === value,
        true
      )
  );
}

export function select(
  currentNode: NodeStripped,
  jsonPaths: (string | number)[][],
  currentPath: (string | number)[] = ["$"]
) {
  currentNode.params.selected = isCurrentPathMatching(jsonPaths, currentPath);
  if (currentNode.value instanceof Array) {
    currentNode.value.forEach((nextNode) =>
      select(nextNode, jsonPaths, [...currentPath, nextNode.params.id])
    );
  }
}

type SelectableNode<K extends keyof T, T = Node> = {
  [P in K]: T[P];
};
