import React from "react";
import _ from "lodash";
import { observer } from "mobx-react";

const updateDelayed = _.debounce(
  (value: string, delayedInputProps: DelayedInputProps) => {
    if (delayedInputProps.validator(value)) {
      Object.assign(delayedInputProps.stateReference, {
        delayedValue: value,
        validity: "valid",
      });
    } else {
      Object.assign(delayedInputProps.stateReference, {
        validity: "invalid",
      });
    }
  },
  2000
);

const change = (value: string, delayedInputProps: DelayedInputProps) => {
  // for one time reconcillation
  Object.assign(delayedInputProps.stateReference, {
    fieldValue: value,
    validity: "notyet",
  });
  //updateDelayed(value, delayedInputProps);
};

export const DelayedInput = observer((props: DelayedInputProps) => (
  <div className={`input ${props.stateReference.validity}`}>
    <input
      type={"text"}
      value={props.stateReference.fieldValue}
      onChange={(evt) => change(evt.target.value, props)}
    />
  </div>
));

interface DelayedInputProps {
  validator: (text: string) => boolean;
  stateReference: StateReference;
}

export interface StateReference {
  fieldValue: string;
  validity: "notyet" | "valid" | "invalid";
  delayedValue: string;
}

export function createInitialDelayedInputState(): StateReference {
  return { fieldValue: "", validity: "notyet", delayedValue: "" };
}
