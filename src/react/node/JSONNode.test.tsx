import { shallow, configure, mount } from "enzyme";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { observable } from "mobx";
import { JSONNode, renderValue } from "./JSONNode";
import "jsdom-global/register";
import { Node } from "../../utils/ToTree";
import { $ } from "../../utils/TestUtil";

configure({ adapter: new Adapter() });

describe("Root Json Tests", () => {
  test("Root Json Node", () => {
    const sample = observable($("root", []) as Node);
    const render = shallow(<JSONNode node={sample} />);
    expect(render.find("div div.name").text()).toContain("root");
  });

  test("Root Json Modifies Expanded On Click", () => {
    const sample = observable($("root", [], true)) as Node;
    const render = shallow(<JSONNode node={sample} />);
    render.find(".expander").simulate("click");
    expect(sample.params.expanded).toBeTruthy();
  });

  test("Root Json Expands On Click", () => {
    const sample = observable(
      $("root", [$("door", "knob", false, "value")], true, "object")
    ) as Node;
    const render = mount(<JSONNode node={sample} />);
    expect(render.find(".elements .name").length).toEqual(0);
    render.find("div > .element .expander").simulate("click");
    expect(render.find(".elements .name").text()).toContain("door");
  });

  test("Node won't expand when not enumerable", () => {
    const sample = observable($("root", [], false, "object")) as Node;
    const render = mount(<JSONNode node={sample} />);
    expect(render.find(".elements .name").length).toEqual(0);
    render.find("div > .element .expander").simulate("click");
    expect(render.find(".elements .name").length).toEqual(0);
  });

  describe("JSON Node Value Render", () => {
    const createTest = (
      withValue: any,
      /* then */ rendersThat: string | number
    ) => {
      test(`when Executed with ${withValue} then renders ${rendersThat}`, () => {
        expect(renderValue(withValue)).toEqual(rendersThat);
      });
    };

    createTest($("some", "string", true, "value"), "string");
    createTest($("some", [], false, "object"), "{}");
    createTest($("some", [], false, "array"), "[]");
    createTest($("some", 2137, false, "value"), 2137);
    createTest($("some", null, false, "value"), null);
  });

  test("JSON Node renders its value", () => {
    const sample = observable($("root", [], false, "object")) as Node;
    const render = shallow(<JSONNode node={sample} />);
    expect(render.find(".value").text()).toEqual("{}");
  });

  test("JSON Node renders adds selected class when selected", () => {
    const sample = observable($("root", [], false, "object", true)) as Node;
    const render = shallow(<JSONNode node={sample} />);
    expect(render.find(".element.selected").length).toBe(1);
  });
});
