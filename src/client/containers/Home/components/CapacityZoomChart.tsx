import React from "react";
import {
  DomainPropType,
  VictoryArea,
  VictoryBrushContainer,
  VictoryGroup
} from "victory";

type DataType = Array<{
  date: Date;
  gbps: number;
}>;

interface CapacityZoomChartProps {
  cdn: DataType;
  p2p: DataType;
  x: string;
  y: string;
  selectedDomain: DomainPropType | undefined;
  onBrush: (domain: DomainPropType) => void;
}

const CapacityZoomChart = ({
  cdn,
  p2p,
  x,
  y,
  selectedDomain,
  onBrush
}: CapacityZoomChartProps) => (
  <VictoryGroup
    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
    width={1200}
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
    <VictoryArea
      data={p2p}
      x={x}
      y={y}
      style={{ data: { fill: "#4FBCF2" } }}
    />
    <VictoryArea
      data={cdn}
      x={x}
      y={y}
      style={{ data: { fill: "#B2125C" } }}
    />
  </VictoryGroup>
);

export default CapacityZoomChart;
