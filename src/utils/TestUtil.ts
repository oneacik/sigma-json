// This function changes its signature so often that I do not define the type
import { PossibleTypes } from "./ToTree";

export function $(
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
