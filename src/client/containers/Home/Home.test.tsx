import { mount, shallow } from "enzyme";
import fetchMock from "fetch-mock";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { ErrorPage } from "../";
import Home from "./";

// @ts-ignore
fetchMock.config = Object.assign(fetchMock.config, { overwriteRoutes: true });

describe("<Home />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<Home />, div);
    unmountComponentAtNode(div);
  });

  it("renders ErrorPage if fetch fails", async () => {
    fetchMock.get(`/bandwidth`, { throws: new Error() });
    const wrapper = shallow(<Home />);

    const instance = wrapper.instance() as Home;

    try {
      await instance.fetchBandwidthData();
    } catch (error) {
      // something
    }

    expect(wrapper.find(ErrorPage)).toHaveLength(1);
  });

  it("renders corecctly if fetch success", async () => {
    fetchMock.get(
      `/bandwidth`,
      JSON.stringify({ cdn: [[12314, 1234]], p2p: [[123, 4124]] })
    );
    fetchMock.get(
      `/audience`,
      JSON.stringify({ audience: [[123, 123]] })
    );
    const wrapper = mount(<Home />);

    const instance = wrapper.instance() as Home;

    await instance.fetchBandwidthData();

    expect(wrapper.state("bandwidthData")).not.toBe(null);
    expect(wrapper.state("audienceData")).not.toBe(null);
  });
});
