import * as React from "react";
import * as ReactDOM from "react-dom";
import { autorun, observable, reaction } from "mobx";
import { observer } from "mobx-react";
import { JSONNode } from "../node/JSONNode";
import { Node, PossibleTypes, toTree } from "../../utils/ToTree";
import { FileUpload } from "../upload/FileUpload";
import {
  createInitialDelayedInputState,
  DelayedInput,
} from "../input/DelayedInput";
import JSONPath from "jsonpath";
import { select } from "../../utils/JSONPathWalker";

const state = observable({
  json: "{}",
  stateTree: toTree({}),
  stateJsonPath: createInitialDelayedInputState(),
});

reaction(
  () => [state.stateJsonPath.delayedValue, state.stateTree],
  () => {
    const paths = JSONPath.paths(
      JSON.parse(state.json),
      state.stateJsonPath.delayedValue
    );
    select(state.stateTree, paths);
  }
);

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
    <DelayedInput
      validator={(x) => {
        try {
          JSONPath.parse(x);
          return true;
        } catch (err) {
          return false;
        }
      }}
      stateReference={state.stateJsonPath}
    />
    <JSONNode node={state.stateTree} />
  </div>
));

ReactDOM.render(<Page />, document.getElementById("root"));
