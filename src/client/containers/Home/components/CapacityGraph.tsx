import React, { Component } from "react";
import {
  DomainPropType,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer
} from "victory";

import { CapacityZoomChart } from "./";

interface CapacityGraphProps {
  bandwidthData: {
    cdn: number[][];
    p2p: number[][];
  };
}

interface CapacityGraphState {
  selectedDomain: undefined | DomainPropType;
}

const Months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const AXIS: { x: string; y: string } = {
  x: "date",
  y: "gbps"
};

type formatDataType = (
  data: number[][]
) => Array<{
  date: Date;
  gbps: number;
}>;

const formatData: formatDataType = (data: number[][]) => {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    const newData = {
      date: new Date(data[i][0]),
      gbps: data[i][1]
    };
    result[i] = newData;
  }
  return result;
};

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

    const axisFormat = (date: number) =>
      `${new Date(date).getDate()}. ${Months[new Date(date).getMonth()]}`;

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
            tickFormat={axisFormat}
          />
          <VictoryAxis
            dependentAxis
            // tslint:disable-next-line
            tickFormat={bytes => `${(bytes / 1073741824).toFixed(1)}\nGbps`}
          />
          <VictoryLine data={data} x={AXIS.x} y={AXIS.y} />
        </VictoryChart>
        <CapacityZoomChart
          data={data}
          x={AXIS.x}
          y={AXIS.y}
          selectedDomain={selectedDomain}
          onBrush={this.handleBrush}
          tickFormat={axisFormat}
        />
      </>
    );
  }
}

export default CapacityGraph;
