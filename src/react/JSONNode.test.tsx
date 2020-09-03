import { shallow, configure } from "enzyme";
import { JSONNode } from "./JSONNode";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("Root Json Node", () => {
  const sample = {
    params: { id: "root" }, value: []
  };
  const render: any = shallow(<JSONNode node={sample}/>);
  render.equals(
    <div>
      <div>root</div>
    </div>
  );
});
