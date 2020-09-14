import { configure, mount } from "enzyme";
import { createInitialDelayedInputState, DelayedInput } from "./DelayedInput";
import React from "react";
import { observable } from "mobx";
import Adapter from "enzyme-adapter-react-16";
import "jsdom-global/register";
import timers from "@sinonjs/fake-timers";

configure({ adapter: new Adapter() });

describe("DelayedInput tests", () => {
  let timer;
  beforeAll(() => {
    timer = timers.install();
  });
  afterAll(() => {
    timer.uninstall();
  });

  test("DelayedInput should change value when input happens", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => true} stateReference={stateReference} />
    );
    input.find("input").simulate("change", { target: { value: "smth" } });
    expect(input.find("input").prop("value")).toBe("smth");
  });

  test("DelayedInput should update delayedValue after some time when validation passes", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => true} stateReference={stateReference} />
    );

    expect(stateReference.delayedValue).toBe("$");
    input.find("input").simulate("change", { target: { value: "smth" } });
    timer.tick(5000); // horrible debounce!

    expect(stateReference.delayedValue).toBe("smth");
  });

  test("DelayedInput should not update delayedValue after some time when validation fails", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => false} stateReference={stateReference} />
    );

    expect(stateReference.delayedValue).toBe("$");
    input.find("input").simulate("change", { target: { value: "smth" } });
    timer.tick(5000); // horrible debounce!

    expect(stateReference.delayedValue).toBe("$");
  });

  test("DelayedInput should change component class to notyet when value is inputted", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => false} stateReference={stateReference} />
    );

    input.find("input").simulate("change", { target: { value: "smth" } });

    expect(input.find(".notyet").length).toBe(1);
  });

  test("DelayedInput should change component class to valid when valid value is inputted after delay", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => true} stateReference={stateReference} />
    );

    input.find("input").simulate("change", { target: { value: "smth" } });
    timer.tick(5000);
    input.update();

    expect(input.childAt(0).hasClass("valid")).toBeTruthy();
  });

  test("DelayedInput should change component class to invalid when invalid value is inputted after delay", () => {
    const stateReference = observable(createInitialDelayedInputState());
    const input = mount(
      <DelayedInput validator={() => false} stateReference={stateReference} />
    );

    input.find("input").simulate("change", { target: { value: "smth" } });
    timer.tick(5000);
    input.update();

    expect(input.childAt(0).hasClass("invalid")).toBeTruthy();
  });
});
