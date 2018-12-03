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
    data &&
    data.cdn &&
    data.p2p && (
      <g style={{ pointerEvents: "none" }}>
        <foreignObject x={1000} y={0} width="198" height="100">
          <div className="graph-tooltip">
            <p>
              <strong>
                {data.p2p.date.toLocaleDateString("en-US", {
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  month: "long",
                  weekday: "long",
                  year: "numeric"
                })}
              </strong>
            </p>
            <p>
              P2P:{" "}
              <span className="text--light-blue">
                {formatBytes(data.p2p.gbps)}Gbps
              </span>
            </p>
            <p>
              CDN:{" "}
              <span className="text--berry">
                {formatBytes(data.cdn.gbps)}Gbps
              </span>
            </p>
            <hr />
            <p>
              Total:{" "}
              <span className="text--green">
                {formatBytes(data.p2p.gbps + data.cdn.gbps)}Gbps
              </span>
            </p>
            <p>
              Spike reduction:{" "}
              <span className="text--light-blue">
                {getPercentage(data.p2p.gbps, data.cdn.gbps)}%
              </span>
            </p>
          </div>
        </foreignObject>
      </g>
    )
  );
};

export default CapacityTooltip;
