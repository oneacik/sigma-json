import { Node, PossibleTypes, toTree } from "./ToTree";
import { $ } from "./TestUtil";



describe("full", () => {
  test("toTree creates root representation", () => {
    expect(toTree({})).toMatchObject($("root", []));
  });

  test("toTree creates representation for non empty root", () => {
    expect(toTree({ ksi: "delta" })).toMatchObject(
      $("root", [$("ksi", "delta")])
    );
  });

  test("toTree creates representation for nested structure", () => {
    expect(toTree({ ksi: { delta: "nile" } })).toMatchObject(
      $("root", [$("ksi", [$("delta", "nile")])])
    );
  });

  test("toTree serves array types", () => {
    expect(toTree({ arr: ["ksi"] })).toMatchObject(
      $("root", [$("arr", [$(0, "ksi")])])
    );
  });

  test("toTree correctly handles enumerable property with types", () => {
    expect(toTree({ arr: ["ksi"] })).toMatchObject(
      $("root", [$("arr", [$(0, "ksi", false)], true)], true)
    );
  });

  describe("toTree correctly defines types", () => {
    [
      [{ x: "smth" }, "value"],
      [{ x: 2 }, "value"],
      [{ x: null }, "value"],
      [{ x: [] }, "array"],
      [{ x: {} }, "object"],
    ].forEach(([value, type]: [{ x: any }, string]) =>
      test(`value '${value.x}' is mapped to correct type: ${type}`, () => {
        expect((toTree(value).value[0] as Node).params.type).toBe(type);
      })
    );
  });

  test("toTree correctly handles enumerable property with empty array", () => {
    expect(toTree({ arr: [] })).toMatchObject(
      $("root", [$("arr", [], false)], true)
    );
  });

  test("toTree correctly handles enumerable property with empty object", () => {
    expect(toTree({ arr: {} })).toMatchObject(
      $("root", [$("arr", [], false)], true)
    );
  });
});
