import { observer } from "mobx-react";
import * as React from "react";
import "./FileUpload.css";

const validateJSON = (content) => {
  try {
    JSON.parse(content);
    return true;
  } catch (err) {
    return false;
  }
};

const handleFileEvent = (event, x: FileUploadState) => {
  const fileList = event.target.files;
  const fileReader = new FileReader();

  fileReader.onload = (event) => {
    const content = event.target.result as string;
    const validated = validateJSON(content);
    if (validated) {
      Object.assign(x, {
        loading: false,
        validity: "valid",
        fileContents: content,
      });
    } else {
      Object.assign(x, { loading: false, validity: "invalid" });
    }
  };

  fileReader.onerror = () => {
    Object.assign(x, { loading: false, validity: "invalid" });
  };
  fileReader.onabort = () => {
    Object.assign(x, { loading: false, validity: "invalid" });
  };

  if (fileList.length > 0) {
    x.loading = true;
    fileReader.readAsText(fileList[0]);
  }
};

export const FileUpload = observer(({ state }: JSONNodeProps) => (
  <div className={`file-upload ${state.validity}`}>
    <label htmlFor="file-input">{state.loading ? "⧗" : "↓"}</label>
    <input
      id={"file-input"}
      type={"file"}
      name={"jsonFile"}
      className={"jsonFile"}
      disabled={state.loading}
      onChange={(evt) => handleFileEvent(evt, state)}
    />
  </div>
));

interface JSONNodeProps {
  state: FileUploadState;
}

interface FileUploadState {
  loading: boolean;
  fileContents: string;
  validity: "notyet" | "valid" | "invalid";
}

export function createFileUploadState(): FileUploadState {
  return { loading: false, fileContents: "{}", validity: "notyet" };
}
