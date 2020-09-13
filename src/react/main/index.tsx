import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable, reaction } from "mobx";
import { observer } from "mobx-react";
import JSONPath from "jsonpath";
import { JSONNode } from "../node/JSONNode";
import { toTree } from "../../utils/ToTree";
import { FileUpload } from "../upload/FileUpload";
import { createInitialDelayedInputState, DelayedInput } from "../input/DelayedInput";
import { select } from "../../utils/JSONPathWalker";
import "./Main.css";
import { Container } from "../node/Container";

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
  <div className={"main"}>
    <div className={"line"}>
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
    </div>
    <Container>
      <JSONNode node={state.stateTree} />
    </Container>
  </div>
));

ReactDOM.render(<Page />, document.getElementById("root"));
