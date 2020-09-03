import { Node, toTree } from "./ToTree";

export function $(id, value): Node {
  return { params: { id, expanded: false, selected: false }, value };
}

describe("full", () => {
  test("toTree creates root representation", () => {
    expect(toTree({}))
      .toEqual($("root", []));
  });

  test("toTree creates representation for non empty root", () => {
    expect(toTree({ ksi: "delta" }))
      .toEqual(
        $("root", [
          $("ksi", "delta")
        ]));
  });

  test("toTree creates representation for nested structure", () => {
    expect(toTree({ ksi: { delta: "nile" } }))
      .toEqual(
        $("root", [
          $("ksi", [
            $("delta", "nile")
          ])
        ]));
  });

  test("toTree serves array types", () => {
    expect(toTree({ arr: ["ksi"] }))
      .toEqual($("root", [
        $("arr", [
          $("0", "ksi")
        ])
      ]));
  });


});
