import { $ as elem } from "./ToTree.test";
import { Node, PossibleTypes } from "./ToTree";
import { NodeStripped, reset } from "./JSONPathWalker";

//some of $ parameters are not important here for building mocks
function $(id, value, selected, type: PossibleTypes = "object"): NodeStripped {
  return elem(id, value, false, type, selected);
}

describe("JSONPathWalker resets correcly", () => {
  test("When Reset is invoked then root is unselected", () => {
    const node: NodeStripped = $("root", [], true);
    reset(node);
    expect(node).toMatchObject<RecursivePartial<Node>>({
      params: { selected: false }
    });
  });
});

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};
