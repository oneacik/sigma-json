import { DeepPartial } from "ts-essentials";
import JSONPath from "jsonpath";
import { $ as elem } from "./TestUtil";
import { Node, PossibleTypes, toTree } from "./ToTree";
import { NodeStripped, reset, select } from "./JSONPathWalker";

// some of $ parameters are not important here for building mocks
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

  test("select nodes will not select unmatchable nodes", () => {
    const node: NodeStripped = $(
      "root",
      [$("X", [], false), $("Y", [], false)],
      false
    );
    select(node, [["$", "X"]]);
    expect(node).toMatchObject<DeepPartial<Node>>({
      params: { selected: false },
      value: [
        {},
        {
          params: { selected: false },
        },
      ],
    });
  });

  it("select and toTree will work with real data", () => {
    const json = {
      store: {
        book: [
          {
            category: "reference",
            author: "Nigel Rees",
            title: "Sayings of the Century",
            price: 8.95,
          },
          {
            category: "fiction",
            author: "Evelyn Waugh",
            title: "Sword of Honour",
            price: 12.99,
          },
          {
            category: "fiction",
            author: "Herman Melville",
            title: "Moby Dick",
            isbn: "0-553-21311-3",
            price: 8.99,
          },
          {
            category: "fiction",
            author: "J. R. R. Tolkien",
            title: "The Lord of the Rings",
            isbn: "0-395-19395-8",
            price: 22.99,
          },
        ],
        bicycle: {
          color: "red",
          price: 19.95,
        },
      },
    };

    const tree = toTree(json);
    const queryResult = JSONPath.paths(json, "$..author");
    select(tree, queryResult);
    expect(
      JSONPath.query(tree, "$..[?(@.params.selected==true)].value")
    ).toEqual([
      "Nigel Rees",
      "Evelyn Waugh",
      "Herman Melville",
      "J. R. R. Tolkien",
    ]);
  });

  it("test select performance", () => {
    console.time("json");
    const json = {
      ...new Array(100000)
        .fill(0)
        .map((value, index) => ({ [`idx${index}`]: value })),
    };
    console.timeEnd("json");

    console.time("tree");
    const tree = toTree(json);
    console.timeEnd("tree");

    console.time("paths");
    const paths = JSONPath.paths(json, "$..*");
    console.timeEnd("paths");

    console.time("select");
    select(tree, paths);
    console.timeEnd("select");
  });

  // TODO: Create test for performance and add tweaks to make it pass in time
});
