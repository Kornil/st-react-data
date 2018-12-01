import React from "react";

import { findRightData, formatBytes, getPercentage } from "../utils";

interface CapacityTooltipProps {
  x: number;
  y: number;
  cdn: Array<{ date: Date; gbps: number }>;
  p2p: Array<{ date: Date; gbps: number }>;
  datum: any;
}

const CapacityTooltip = ({ datum, cdn, p2p }: CapacityTooltipProps) => {
  const data = findRightData(datum.date, cdn, p2p);
  return (
    data.cdn &&
    data.p2p && (
      <g style={{ pointerEvents: "none" }}>
        <foreignObject x={600} y={0} width="250" height="100">
          <div className="graph-tooltip">
          hello
          </div>
        </foreignObject>
      </g>
    )
  );
};

export default CapacityTooltip;
