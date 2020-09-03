export function toTree(obj: object) {
  const entries = Object.entries(obj).map(([id, value]) => ({ params: { id }, value }));
  return { params: {}, value: entries };
}
