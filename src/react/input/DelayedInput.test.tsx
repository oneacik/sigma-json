import { configure, mount, shallow } from "enzyme";
import { createInitialDelayedInputState, DelayedInput } from "./DelayedInput";
import React from "react";
import { autorun, observable } from "mobx";
import Adapter from "enzyme-adapter-react-16";
import "jsdom-global/register";

configure({ adapter: new Adapter() });

describe("DelayedInput tests", () => {
  test("DelayedInput should change value", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => true} stateReference={stateReference} />
    );
    input.find("input").simulate("change", { target: { value: "smth" } });
    expect(input.find("input").prop("value")).toBe("smth");
  });
});
