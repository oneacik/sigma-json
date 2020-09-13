import React from "react";
import _ from "lodash";

const updateDelayed = _.debounce(
  (value: string, delayedInputProps: DelayedInputProps) => {
    if (delayedInputProps.validator(value)) {
      delayedInputProps.stateReference = {
        ...delayedInputProps.stateReference,
        delayedValue: value,
        validity: "valid",
      };
    } else {
      delayedInputProps.stateReference = {
        ...delayedInputProps.stateReference,
        validity: "invalid",
      };
    }
  },
  2000
);

const change = (value: string, delayedInputProps: DelayedInputProps) => {
  // for one time reconcillation
  delayedInputProps.stateReference = {
    ...delayedInputProps.stateReference,
    fieldValue: value,
    validity: "notyet",
  };
  updateDelayed(value, delayedInputProps);
};

const DelayedInput = (props: DelayedInputProps) => (
  <div className={`input ${props.stateReference.validity}`}>
    <input
      type={"text"}
      value={props.stateReference.fieldValue}
      onChange={(evt) => change(evt.target.value, props)}
    />
  </div>
);

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
