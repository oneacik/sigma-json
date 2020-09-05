import { Node, PossibleTypes, toTree } from "./ToTree";

export function $(id, value, enumerable = true, type: PossibleTypes = "value"): Node {
  return { params: { id, expanded: false, selected: false, enumerable, type }, value };
}

describe("full", () => {
  test("toTree creates root representation", () => {
    expect(toTree({}))
      .toEqual($("root", [], true, "object"));
  });

  test("toTree creates representation for non empty root", () => {
    expect(toTree({ ksi: "delta" }))
      .toEqual(
        $("root", [
          $("ksi", "delta", false)
        ], true, "object"));
  });

  test("toTree creates representation for nested structure", () => {
    expect(toTree({ ksi: { delta: "nile" } }))
      .toEqual(
        $("root", [
          $("ksi", [
            $("delta", "nile", false)
          ], true, "object")
        ], true, "object"));
  });

  test("toTree serves array types", () => {
    expect(toTree({ arr: ["ksi"] }))
      .toEqual($("root", [
        $("arr", [
          $("0", "ksi", false)
        ], true, "array")
      ], true, "object"));
  });

  describe("toTree correctly defines types", () => {
    [
      [{ x: "smth" }, "value"],
      [{ x: 2 }, "value"],
      [{ x: null }, "value"],
      [{ x: [] }, "array"],
      [{ x: {} }, "object"],
    ].forEach(
      ([value, type]: [{ x: any }, string]) => test(`value '${value.x}' is mapped to correct type: ${type}`, () => {
        expect((toTree(value).value[0] as Node).params.type).toBe(type);
      })
    );
  });


});
