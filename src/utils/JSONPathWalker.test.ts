import { $ as elem } from "./ToTree.test";
import { Node, PossibleTypes } from "./ToTree";
import { NodeStripped, reset } from "./JSONPathWalker";
import { DeepPartial } from "ts-essentials";

//some of $ parameters are not important here for building mocks
function $(id, value, selected, type: PossibleTypes = "object"): NodeStripped {
  return elem(id, value, false, type, selected);
}

describe("JSONPathWalker resets correcly", () => {
  test("When Reset is invoked then root is unselected", () => {
    const node: NodeStripped = $("root", [], true);
    reset(node);
    expect(node).toMatchObject<DeepPartial<Node>>({
      params: { selected: false },
    });
  });

  test("When Reset is invoked then nested nodes are unselected", () => {
    const node: NodeStripped = $("root", [$("X", [], true)], true);
    reset(node);
    expect(node).toMatchObject<DeepPartial<Node>>({
      params: { selected: false },
      value: [
        {
          params: { selected: false },
        },
      ],
    });
  });

  test("select nodes will select matchable nodes", () => {
    const node: NodeStripped = $(
      "root",
      [$("X", [], false), $("Y", [], false)],
      false
    );
    select(node, [["$", "X"]]);
    expect(node).toMatchObject<DeepPartial<Node>>({
      params: { selected: false },
      value: [
        {
          params: { selected: true },
        },
        {},
      ],
    });
  });
});
