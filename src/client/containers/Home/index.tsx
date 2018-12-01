import React, { Component } from "react";

import { ErrorPage, LoadingPage } from "../";
import { CapacityGraph } from "./components";
import { formatData } from "./utils";

interface HomeState {
  status: "loading" | "error" | "success";
  audienceData: number[][] | null;
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
    const { bandwidthData, status } = this.state;
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
                cdn={formatData(bandwidthData.cdn)}
                p2p={formatData(bandwidthData.p2p)}
              />
            )}
          </>
        );
    }
  }
}

export default Home;
