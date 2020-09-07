type Value = Node[] | string | number;
export type PossibleTypes = "object" | "array" | "value";
export type Params = {
  id: string | number;
  type: PossibleTypes;
  expanded: Boolean;
  selected: Boolean;
  enumerable: Boolean;
};
export type Node = {
  params: Params;
  value: Value;
};

function isEnumerable(value: any) {
  return value instanceof Array || value instanceof Object;
}

function getType(value: any): PossibleTypes {
  switch (true) {
    case value instanceof Array:
      return "array";
    case value instanceof Object:
      return "object";
    case value instanceof Number:
    case value instanceof String:
    default:
      return "value";
  }
}

function createEntry(
  id: string | number,
  value: Value,
  type: "object" | "array" | "value"
): Node {
  return {
    params: {
      id,
      expanded: false,
      selected: false,
      type,
      enumerable: isEnumerable(value),
    },
    value,
  };
}

function explode(entry): Value {
  if (entry instanceof Array) {
    return entry.map((value, id) =>
      createEntry(id, explode(value), getType(value))
    );
  }
  if (entry instanceof Object) {
    return Object.entries(entry).map(([id, value]) =>
      createEntry(id, explode(value), getType(value))
    );
  }
  return entry;
}

export function toTree(kobiekt: object) {
  return createEntry("root", explode(kobiekt), getType(kobiekt));
}
