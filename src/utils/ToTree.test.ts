import { toTree } from "./ToTree";

function $(id, value) {
  return { params: { id }, value };
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
});
