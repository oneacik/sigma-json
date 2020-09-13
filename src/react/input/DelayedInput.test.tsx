import { configure, mount, shallow } from "enzyme";
import { createInitialDelayedInputState, DelayedInput } from "./DelayedInput";
import React from "react";
import { observable } from "mobx";
import Adapter from "enzyme-adapter-react-16";
import "jsdom-global/register";
import timers from "@sinonjs/fake-timers";

configure({ adapter: new Adapter() });

describe("DelayedInput tests", () => {
  var timer = timers.install();

  test("DelayedInput should change value", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => true} stateReference={stateReference} />
    );
    input.find("input").simulate("change", { target: { value: "smth" } });
    expect(input.find("input").prop("value")).toBe("smth");
  });

  test("DelayedInput should update delayedValue after some time", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => true} stateReference={stateReference} />
    );

    expect(stateReference.delayedValue).toBe("");
    input.find("input").simulate("change", { target: { value: "smth" } });
    timer.tick(5000); // horrible debounce!

    expect(stateReference.delayedValue).toBe("smth");
  });
});
