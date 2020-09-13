import { observer } from "mobx-react";
import React from "react";
import "./ContainerStyle.css";

export const Container = observer(({ children }: ContainerProps) => (
  <div className={"container"}>{children}</div>
));

interface ContainerProps {
  children: React.ReactElement;
}
