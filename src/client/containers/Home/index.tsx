import React, { Component } from "react";

import { ErrorPage, LoadingPage } from "../";

interface HomeState {
  status: "loading" | "error" | "success";
  bandwidthData: {
    cdn: number[];
    p2p: number[];
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
    const { status } = this.state;
      switch(status) {
        case "loading":
          return <LoadingPage />
        case "error":
          return <ErrorPage />
        case "success":
          return <h3>hello</h3>
      }
  }
}

export default Home;
