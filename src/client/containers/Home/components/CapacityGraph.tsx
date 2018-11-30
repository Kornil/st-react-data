import React, { Component } from "react";
import {
  DomainPropType,
  VictoryArea,
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
    const { cdn, p2p } = this.props.bandwidthData;
    const { selectedDomain } = this.state;

    const cdnData = formatData(cdn);
    const p2pData = formatData(p2p);
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
          <VictoryArea
            data={p2pData}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { fill: "#4FBCF2" } }}
          />
          <VictoryLine
            data={p2pData}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { stroke: "#3AA0D3", strokeWidth: 3 } }}
          />
          <VictoryArea
            data={cdnData}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { fill: "#B2125C" } }}
          />
          <VictoryLine
            data={cdnData}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { stroke: "#511883", strokeWidth: 3 } }}
          />
        </VictoryChart>
        <CapacityZoomChart
          cdnData={cdnData}
          p2pData={p2pData}
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
