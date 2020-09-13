import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable, reaction } from "mobx";
import { observer } from "mobx-react";
import JSONPath from "jsonpath";
import { JSONNode } from "../node/JSONNode";
import { toTree } from "../../utils/ToTree";
import { createFileUploadState, FileUpload } from "../upload/FileUpload";
import {
  createInitialDelayedInputState,
  DelayedInput,
} from "../input/DelayedInput";
import { select } from "../../utils/JSONPathWalker";
import "./Main.css";
import { Container } from "../node/Container";

const state = observable({
  fileUpload: createFileUploadState(),
  stateTree: toTree({}),
  stateJsonPath: createInitialDelayedInputState(),
});

reaction(
  () => [state.stateJsonPath.delayedValue, state.stateTree],
  () => {
    const paths = JSONPath.paths(
      JSON.parse(state.fileUpload.fileContents),
      state.stateJsonPath.delayedValue
    );
    select(state.stateTree, paths);
  }
);

reaction(
  () => state.fileUpload.fileContents,
  () => {
    try {
      const objectToView = JSON.parse(state.fileUpload.fileContents);
      state.stateTree = toTree(objectToView);
    } catch (e) {
      console.debug(e);
    }
  }
);

const Page = observer(() => (
  <div className={"main"}>
    <div className={"line"}>
      <FileUpload state={state.fileUpload} />
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

const mount = document.createElement("div");
mount.id = "root";
document.body.appendChild(mount);

ReactDOM.render(<Page />, mount);
