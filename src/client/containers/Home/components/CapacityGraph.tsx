import React, { Component } from "react";
import {
  // TODO send PR to @types/victory to add VictoryVoronoiContainer
  // @ts-ignore
  createContainer,
  DomainPropType,
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip
} from "victory";

import { formatBytes, formatTime } from "../utils";
import { CapacityZoomChart } from "./";

const AXIS: { x: string; y: string } = {
  x: "date",
  y: "gbps"
};

interface CapacityGraphProps {
  cdn: Array<{ date: Date; gbps: number; }>;
  p2p: Array<{ date: Date; gbps: number; }>;
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
    const { cdn, p2p } = this.props;
    const { selectedDomain } = this.state;

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    return (
      <>
        <VictoryChart
          width={800}
          height={600}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={selectedDomain}
              onZoomDomainChange={this.handleZoom}
              labels={d =>  d.gbps}
              labelComponent={<VictoryTooltip />}
            />
          }
        >
          <VictoryAxis
            tickFormat={formatTime}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={formatBytes}
          />
          <VictoryArea
            data={p2p}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { fill: "#4FBCF2" } }}
          />
          <VictoryLine
            data={p2p}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { stroke: "#3AA0D3", strokeWidth: 3 } }}
          />
          <VictoryArea
            data={cdn}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { fill: "#B2125C" } }}
          />
          <VictoryLine
            data={cdn}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { stroke: "#511883", strokeWidth: 3 } }}
          />
        </VictoryChart>
        <CapacityZoomChart
          cdn={cdn}
          p2p={p2p}
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
