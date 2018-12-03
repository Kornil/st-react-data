import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import AudienceGraph from "./AudienceGraph";

const date = new Date();

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<AudienceGraph data={[{ date, audience: 123 }]} />, div);
  unmountComponentAtNode(div);
});
