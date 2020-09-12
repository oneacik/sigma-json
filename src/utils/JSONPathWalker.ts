import hash from "object-hash";
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
  jsonPath: Set<string>,
  currentPath: (string | number)[]
): Boolean {
  return jsonPath.has(hash(currentPath));
}

export function select(
  currentNode: NodeStripped,
  jsonPaths: (string | number)[][],
  currentPath: (string | number)[] = ["$"]
) {
  _select(
    currentNode,
    new Set(jsonPaths.map((jsonPath) => hash(jsonPath))),
    currentPath
  );
}

function _select(
  currentNode: NodeStripped,
  jsonPaths: Set<string>,
  currentPath: (string | number)[] = ["$"]
) {
  currentNode.params.selected = isCurrentPathMatching(jsonPaths, currentPath);
  if (currentNode.value instanceof Array) {
    currentNode.value.forEach((nextNode) =>
      _select(nextNode, jsonPaths, [...currentPath, nextNode.params.id])
    );
  }
}

type SelectableNode<K extends keyof T, T = Node> = {
  [P in K]: T[P];
};
