import * as React from "react";
import { Node } from "../utils/ToTree";
import { observer } from "mobx-react";


export const JSONNode = observer((props: JSONNodeProps) => (
  <div>
    <div className={"element"}>
      <div
        onClick={() => props.node.params.expanded = !props.node.params.expanded}
        className={"expander"}
      >+
      </div>
      <div className={"name"}>{props.node.params.id}</div>
    </div>
    <div className={"elements"}>
      {props.node.params.enumerable && (props.node.value as Node[]).map(node => <JSONNode key={props.node.params.id}
                                                                                          node={node}/>)}
    </div>
  </div>
));

interface JSONNodeProps {
  node: Node
}

