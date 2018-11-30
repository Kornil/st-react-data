import { shallow } from "enzyme";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import CapacityGraph from "./CapacityGraph";

const bandwidthData: {
  cdn: number[][];
  p2p: number[][];
} = { cdn: [[12314, 1234]], p2p: [[123, 4124]] };

describe("<CapacityGraph />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<CapacityGraph bandwidthData={bandwidthData} />, div);
    unmountComponentAtNode(div);
  });

  it("handleZoom zooms", async () => {
    const wrapper = shallow(<CapacityGraph bandwidthData={bandwidthData} />);

    const instance = wrapper.instance() as CapacityGraph;

    await instance.handleZoom({ x: [1, 2], y: [3, 4] });

    expect(wrapper.state("selectedDomain")).toEqual({ x: [1, 2], y: [3, 4] });
  });

  it("handleBrush brushes", async () => {
    const wrapper = shallow(<CapacityGraph bandwidthData={bandwidthData} />);

    const instance = wrapper.instance() as CapacityGraph;

    await instance.handleBrush({ x: [1, 2], y: [3, 4] });

    expect(wrapper.state("selectedDomain")).toEqual({ x: [1, 2], y: [3, 4] });
  });
});
