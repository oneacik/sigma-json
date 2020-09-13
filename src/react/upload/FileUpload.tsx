import { observer } from "mobx-react";
import * as React from "react";
import { ChangeEventHandler } from "react";
import { Node } from "../../utils/ToTree";

const handleFileEvent = (handler: (fileContents: string) => void) => (x) => {
  const fileList = x.target.files;
  const fileReader = new FileReader();

  fileReader.onload = (event) => {
    handler(event.target.result as string);
  };

  fileList.length > 0 && fileReader.readAsText(fileList[0]);
};

export const FileUpload = observer(({ handler }: JSONNodeProps) => (
  <div>
    <input
      type={"file"}
      name={"jsonFile"}
      className={"jsonFile"}
      onChange={handleFileEvent(handler)}
    />
  </div>
));

interface JSONNodeProps {
  handler: (fileContents: string) => void;
}