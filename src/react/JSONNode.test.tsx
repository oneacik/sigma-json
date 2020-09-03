import { shallow, configure } from "enzyme";
import { JSONNode } from "./JSONNode";
import { Node } from "../utils/ToTree";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";


configure({ adapter: new Adapter() });

const sample: Node = {
  params: { id: "root" },
  value: [
    { params: { id: "ksi" }, value: "delta" },
    { params: { id: "de" }, value: "mo" }
  ]
};

test("Root Json Node", () => {
  const sample = {
    params: { id: "root" }, value: []
  };
  const render: any = shallow(<JSONNode node={sample}></JSONNode>);
  render.equals(<div>
    <div>root</div>
  </div>);
});
