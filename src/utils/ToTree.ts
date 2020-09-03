type Value = Node[] | string | number;
export type Node = { params: { id: string, expanded: Boolean, selected: Boolean }, value: Value }

function createEntry(id, value: Value): Node {
  return { params: { id, expanded: false, selected: false }, value };
}

function explode(entry): Value {
  if (entry instanceof Object) {
    return Object.entries(entry).map(([id, value]) => (createEntry(id, explode(value))));
  }
  if (entry instanceof Array) {
    return Object.entries(entry).map(([id, value]) => (createEntry(id, explode(value))));
  }
  return entry;
}

export function toTree(kobiekt: object) {
  return createEntry("root", explode(kobiekt));
}
