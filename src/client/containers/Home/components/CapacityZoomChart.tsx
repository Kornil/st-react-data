import React from "react";
import {
  DomainPropType,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine
} from "victory";

type DataType = Array<{
  date: Date;
  gbps: number;
}>;

interface CapacityZoomChartProps {
  cdnData: DataType;
  p2pData: DataType;
  x: string;
  y: string;
  selectedDomain: DomainPropType | undefined;
  onBrush: (domain: DomainPropType) => void;
  tickFormat: (date: number) => string;
}

const CapacityZoomChart = ({
  cdnData,
  p2pData,
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
    <VictoryLine data={cdnData} x={x} y={y} />
    <VictoryLine data={p2pData} x={x} y={y} />
  </VictoryChart>
);

export default CapacityZoomChart;
