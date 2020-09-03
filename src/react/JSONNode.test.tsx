import { shallow, configure } from "enzyme";
import { JSONNode } from "./JSONNode";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { $ } from "../utils/ToTree.test";

configure({ adapter: new Adapter() });

describe("Root Json Tests", () => {
  test("Root Json Node", () => {
    const sample = $("root", []);
    const render: any = shallow(<JSONNode node={sample}/>);
    render.equals(
      <div>
        <div>root</div>
      </div>
    );
  });

  test("Root Json Modifies Expanded On Click", () => {
    const sample = $("root", []);
    const render = shallow(<JSONNode node={sample}/>);
    render.find(".button").simulate("click");
    expect(sample.params.expanded).toBeTruthy();
  });
});


