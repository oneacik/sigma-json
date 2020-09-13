import * as React from "react";
import * as ReactDOM from "react-dom";
import { autorun, observable, reaction } from "mobx";
import { observer } from "mobx-react";
import { JSONNode } from "../node/JSONNode";
import { Node, PossibleTypes, toTree } from "../../utils/ToTree";
import { FileUpload } from "../upload/FileUpload";

function $(
  id,
  value,
  enumerable?: boolean | undefined,
  type?: PossibleTypes | undefined,
  selected: boolean = false
) {
  return {
    params: {
      id,
      expanded: false,
      selected,
      ...(enumerable !== undefined ? { enumerable } : {}),
      ...(type !== undefined ? { type } : {}),
    },
    value,
  };
}

const sampleTree = $(
  "root",
  [$("door", "knob", false, "value")],
  true,
  "object"
) as Node;

const state = observable({ json: "", stateTree: sampleTree });

reaction(
  () => state.json,
  () => {
    try {
      const objectToView = JSON.parse(state.json);
      state.stateTree = toTree(objectToView);
    } catch (e) {
      console.error(e);
    }
    console.warn(state.stateTree);
  }
);

const Page = observer(() => (
  <div>
    <FileUpload handler={(x) => (state.json = x)} />
    <JSONNode node={state.stateTree} />
  </div>
));

ReactDOM.render(<Page />, document.getElementById("root"));
