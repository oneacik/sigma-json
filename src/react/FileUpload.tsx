import { observer } from "mobx-react";
import * as React from "react";

export const JSONNode = observer(() => (
  <div>
    <input type={"file"} name={"jsonFile"} className={"jsonFile"} />
  </div>
));
