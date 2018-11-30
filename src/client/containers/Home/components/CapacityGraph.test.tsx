import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import CapacityGraph from "./CapacityGraph";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(
    <CapacityGraph
      bandwidthData={{ cdn: [[12314, 1234]], p2p: [[123, 4124]] }}
    />,
    div
  );
  unmountComponentAtNode(div);
});
