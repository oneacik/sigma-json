function createEntry(id, value) {
  return { params: { id }, value };
}

function explode(entry) {
  if (entry instanceof Object) {
    return Object.entries(entry).map(([id, value]) => (createEntry(id, explode(value))));
  }
  return entry;
}

export function toTree(kobiekt: object) {
  return createEntry("root", explode(kobiekt));
}
