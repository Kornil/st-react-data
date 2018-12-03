import React from "react";
import {
  DomainPropType,
  VictoryArea,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart
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
  tickFormat: (date: number) => string;
}

const CapacityZoomChart = ({
  cdn,
  p2p,
  x,
  y,
  selectedDomain,
  onBrush,
  tickFormat
}: CapacityZoomChartProps) => (
  <div className="capacity-zoom-graph">
    <VictoryChart
      padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
      width={1250}
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
      <VictoryAxis tickFormat={tickFormat} />
    </VictoryChart>
  </div>
);

export default CapacityZoomChart;
