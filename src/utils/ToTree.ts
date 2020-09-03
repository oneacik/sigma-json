type Value = Node[] | string | number;
type Node = { params: { id: string }, value: Value }

function createEntry(id, value: Value): Node {
  return { params: { id }, value };
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
