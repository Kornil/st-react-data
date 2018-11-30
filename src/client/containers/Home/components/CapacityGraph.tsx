import React, { Component } from "react";
import {
  DomainPropType,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer
} from "victory";

interface CapacityGraphProps {
  bandwidthData: {
    cdn: number[][];
    p2p: number[][];
  };
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

const formatData = (data: number[][]) => {
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

class CapacityGraph extends Component<CapacityGraphProps> {

  render() {
    const { cdn } = this.props.bandwidthData;
    const data = formatData(cdn);
    return (
      <VictoryChart
        width={800}
        height={600}
      >
        <VictoryAxis
          // tslint:disable-next-line
          tickFormat={date =>
            `${new Date(date).getDate()}. ${Months[new Date(date).getMonth()]}`
          }
        />
        <VictoryAxis
          dependentAxis
          // tslint:disable-next-line
          tickFormat={bytes => `${(bytes / 1073741824).toFixed(1)}\nGbps`}
        />
        <VictoryLine data={data} x="date" y="gbps" />
      </VictoryChart>
    );
  }
}

export default CapacityGraph;
