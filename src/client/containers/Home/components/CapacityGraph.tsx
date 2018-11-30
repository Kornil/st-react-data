import React, { Component } from "react";
import {
  DomainPropType,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer
} from "victory";

import { CapacityZoomChart } from "./";
import { formatBytes, formatData, formatTime } from "./utils";

const AXIS: { x: string; y: string } = {
  x: "date",
  y: "gbps"
};

interface CapacityGraphProps {
  bandwidthData: {
    cdn: number[][];
    p2p: number[][];
  };
}

interface CapacityGraphState {
  selectedDomain: undefined | DomainPropType;
}

class CapacityGraph extends Component<CapacityGraphProps, CapacityGraphState> {
  state: CapacityGraphState = {
    selectedDomain: undefined
  };

  handleZoom = (domain: DomainPropType) => {
    this.setState({ selectedDomain: domain });
  };

  handleBrush = (domain: DomainPropType) => {
    this.setState({ selectedDomain: domain });
  };

  render() {
    const { cdn } = this.props.bandwidthData;
    const { selectedDomain } = this.state;

    const data = formatData(cdn);
    return (
      <>
        <VictoryChart
          width={800}
          height={600}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={selectedDomain}
              onZoomDomainChange={this.handleZoom}
            />
          }
        >
          <VictoryAxis
            // tslint:disable-next-line
            tickFormat={formatTime}
          />
          <VictoryAxis
            dependentAxis
            // tslint:disable-next-line
            tickFormat={formatBytes}
          />
          <VictoryLine data={data} x={AXIS.x} y={AXIS.y} />
        </VictoryChart>
        <CapacityZoomChart
          data={data}
          x={AXIS.x}
          y={AXIS.y}
          selectedDomain={selectedDomain}
          onBrush={this.handleBrush}
          tickFormat={formatTime}
        />
      </>
    );
  }
}

export default CapacityGraph;
