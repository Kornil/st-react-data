import React, { Component } from "react";

import { ErrorPage, LoadingPage } from "../";
import { CapacityGraph } from "./components";
import { formatData } from "./utils";

interface HomeState {
  status: "loading" | "error" | "success";
  bandwidthData: {
    cdn: number[][];
    p2p: number[][];
  } | null;
}

class Home extends Component<{}, HomeState> {
  state: HomeState = {
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
      const response: Response = await fetch("/bandwidth");
      const bandwidthData = await response.json();

      this.setState({
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
          bandwidthData && (
            <CapacityGraph
              cdn={formatData(bandwidthData.cdn)}
              p2p={formatData(bandwidthData.p2p)}
            />
          )
        );
    }
  }
}

export default Home;
