function explode(entry) {
  if (entry instanceof Object) {
    return Object.entries(entry).map(([id, value]) => ({ params: { id }, value: explode(value) }));
  }
  return entry;
}

export function toTree(obj: object) {

  return { params: { id: "root" }, value: explode(obj) };
}
