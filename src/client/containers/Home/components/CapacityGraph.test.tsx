import { shallow } from "enzyme";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import CapacityGraph from "./CapacityGraph";

const now = new Date();

const bandwidthData: {
  cdn: Array<{ date: Date; gbps: number }>;
  p2p: Array<{ date: Date; gbps: number }>;
} = { cdn: [{ date: now, gbps: 1234 }], p2p: [{ date: now, gbps: 4124 }] };

describe("<CapacityGraph />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(
      <CapacityGraph cdn={bandwidthData.cdn} p2p={bandwidthData.p2p} />,
      div
    );
    unmountComponentAtNode(div);
  });

  it("handleZoom zooms", async () => {
    const wrapper = shallow(
      <CapacityGraph cdn={bandwidthData.cdn} p2p={bandwidthData.p2p} />
    );

    const instance = wrapper.instance() as CapacityGraph;

    await instance.handleZoom({ x: [1, 2], y: [3, 4] });

    expect(wrapper.state("selectedDomain")).toEqual({ x: [1, 2], y: [3, 4] });
  });

  it("handleBrush brushes", async () => {
    const wrapper = shallow(
      <CapacityGraph cdn={bandwidthData.cdn} p2p={bandwidthData.p2p} />
    );

    const instance = wrapper.instance() as CapacityGraph;

    await instance.handleBrush({ x: [1, 2], y: [3, 4] });

    expect(wrapper.state("selectedDomain")).toEqual({ x: [1, 2], y: [3, 4] });
  });
});
