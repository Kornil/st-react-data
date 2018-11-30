import React from "react";
import {
  DomainPropType,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine
} from "victory";

interface CapacityZoomChartProps {
  data: Array<{
    date: Date;
    gbps: number;
  }>;
  x: string;
  y: string;
  selectedDomain: DomainPropType | undefined;
  onBrush: (domain: DomainPropType) => void;
  tickFormat: (date: number) => string;
}

const CapacityZoomChart = ({
  data,
  x,
  y,
  selectedDomain,
  onBrush,
  tickFormat
}: CapacityZoomChartProps) => (
  <VictoryChart
    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
    width={800}
    height={100}
    scale={{ x: "time" }}
    containerComponent={
      <VictoryBrushContainer
        brushDimension="x"
        brushDomain={selectedDomain}
        onBrushDomainChange={onBrush}
      />
    }
  >
    <VictoryAxis tickFormat={tickFormat} />
    <VictoryLine data={data} x={x} y={y} />
  </VictoryChart>
);

export default CapacityZoomChart;
