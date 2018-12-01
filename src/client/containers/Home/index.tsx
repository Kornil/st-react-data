import React, { Component } from "react";

import { ErrorPage, LoadingPage } from "../";
import { AudienceGraph, CapacityGraph } from "./components";
import { formatAudienceData, formatBandwidthData } from "./utils";

interface HomeState {
  status: "loading" | "error" | "success";
  audienceData: {
    audience: number[][];
  } | null;
  bandwidthData: {
    cdn: number[][];
    p2p: number[][];
  } | null;
}

class Home extends Component<{}, HomeState> {
  state: HomeState = {
    audienceData: null,
    bandwidthData: null,
    status: "loading"
  };

  async componentDidMount() {
    this.fetchBandwidthData();
  }

  // stop async operations to avoid data leaks
  componentWillUnmount() {
    this.setState = () => undefined;
  }

  fetchBandwidthData = async () => {
    try {
      const bandwidthResponse: Response = await fetch("/bandwidth");
      const bandwidthData = await bandwidthResponse.json();

      const audienceResponse: Response = await fetch("/audience");
      const audienceData = await audienceResponse.json();

      this.setState({
        audienceData,
        bandwidthData,
        status: "success"
      });
    } catch (error) {
      this.setState({
        status: "error"
      });
    }
  };

  render() {
    const { audienceData, bandwidthData, status } = this.state;
    switch (status) {
      case "loading":
        return <LoadingPage />;
      case "error":
        return <ErrorPage />;
      case "success":
        return (
          <>
            {bandwidthData && (
              <CapacityGraph
                cdn={formatBandwidthData(bandwidthData.cdn)}
                p2p={formatBandwidthData(bandwidthData.p2p)}
              />
            )}
            {audienceData && (
              <AudienceGraph data={formatAudienceData(audienceData.audience)} />
            )}
          </>
        );
    }
  }
}

export default Home;
