import { shallow, configure, mount } from "enzyme";
import { JSONNode, renderValue } from "./JSONNode";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { $ } from "../utils/ToTree.test";
import { observable } from "mobx";
import "jsdom-global/register";

configure({ adapter: new Adapter() });

describe("Root Json Tests", () => {
  test("Root Json Node", () => {
    const sample = observable($("root", []));
    const render = shallow(<JSONNode node={sample}/>);
    expect(render.find("div div.name").text()).toEqual("root");
  });

  test("Root Json Modifies Expanded On Click", () => {
    const sample = observable($("root", []));
    const render = shallow(<JSONNode node={sample}/>);
    render.find(".expander").simulate("click");
    expect(sample.params.expanded).toBeTruthy();
  });

  test("Root Json Expands On Click", () => {
    const sample = observable($("root", [$("door", "knob", false)]));
    const render = mount(<JSONNode node={sample}/>);
    render.find("div > .elements .expander").simulate("click");
    expect(render.find(".elements .name").text()).toEqual("door");
  });

  describe("JSON Node Value Render", () => {
    const createTest = (withValue : any, /*then*/ rendersThat : string) => {
      test(`when Executed with ${withValue} then renders ${rendersThat}`, () => {
        expect(renderValue(withValue)).toEqual(rendersThat);
      });
    };

    createTest("some string", "some string");
    createTest({some: 'obj'}, "{}");
    createTest(['some', 'array'], "[]");
    createTest(2137, "2137");

  });
});


