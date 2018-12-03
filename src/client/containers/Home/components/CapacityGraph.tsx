import React, { Component } from "react";
import {
  // TODO send PR to @types/victory to add createContainer
  // @ts-ignore
  createContainer,
  DomainPropType,
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip
} from "victory";

import { findMaxValue, formatBytes, formatTime } from "../utils";
import { CapacityTooltip, CapacityZoomChart } from "./";

const AXIS: { x: string; y: string } = {
  x: "date",
  y: "gbps"
};

const noop = () => null;

interface CapacityGraphProps {
  cdn: Array<{ date: Date; gbps: number }>;
  p2p: Array<{ date: Date; gbps: number }>;
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

    const maxCDN = findMaxValue(cdn);
    const maxP2P = findMaxValue(p2p);

    const formatAxisBytes = (bytes: number) => formatBytes(bytes) + "\nGbps";

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    return (
      <>
        <h4>Capacity Offload</h4>
        <VictoryChart
          width={1200}
          height={600}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomVoronoiContainer
              zoomDimension="x"
              zoomDomain={selectedDomain}
              onZoomDomainChange={this.handleZoom}
              labels={noop}
              labelComponent={
                <VictoryTooltip
                  // @ts-ignore
                  flyoutComponent={<CapacityTooltip cdn={cdn} p2p={p2p} />}
                />
              }
            />
          }
        >
          <VictoryAxis tickFormat={formatTime} />
          <VictoryAxis dependentAxis tickFormat={formatAxisBytes} />
          <VictoryArea
            data={p2p}
            x={AXIS.x}
            y={AXIS.y}
            style={{
              data: { fill: "#4FBCF2", stroke: "#3AA0D3", strokeWidth: 3 }
            }}
          />
          <VictoryArea
            data={cdn}
            x={AXIS.x}
            y={AXIS.y}
            style={{
              data: { fill: "#B2125C", stroke: "#511883", strokeWidth: 3 }
            }}
          />
          <VictoryLine
            data={[
              { x: cdn[0].date, y: maxCDN },
              { x: cdn[cdn.length - 1].date, y: maxCDN }
            ]}
            labels={[`Maximum CDN contribution: ${formatBytes(maxCDN)}Gbps`]}
            labelComponent={<VictoryLabel x={175} />}
            style={{
              data: {
                stroke: "#B2125C",
                strokeDasharray: "5,5",
              }
            }}
          />
          <VictoryLine
            data={[
              { x: cdn[0].date, y: maxP2P },
              { x: cdn[cdn.length - 1].date, y: maxP2P }
            ]}
            labels={[`Maximum throughput: ${formatBytes(maxP2P)}Gbps`]}
            labelComponent={<VictoryLabel y={80} x={600} />}
            style={{
              data: {
                stroke: "#458741",
                strokeDasharray: "5,5",
                strokeWidth: 3
              }
            }}
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
