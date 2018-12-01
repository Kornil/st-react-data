import React, { Component } from "react";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory";

const AXIS: { x: string; y: string } = {
  x: "date",
  y: "audience"
};

interface AudienceGraphProps {
  data: Array<{
    date: Date;
    audience: number;
  }>;
}

class AudienceGraph extends Component<AudienceGraphProps> {
  render() {
    const { data } = this.props;
    return (
      <>
        <h4>Cuncurrent Viewers</h4>
        <VictoryChart
          padding={{ left: 90, top: 0, right: 0, bottom: 0 }}
          width={1200}
          height={200}
          scale={{ x: "time" }}
        >
          <VictoryAxis dependentAxis />
          <VictoryLine
            data={data}
            x={AXIS.x}
            y={AXIS.y}
            style={{ data: { stroke: "#E65F00" } }}
          />
        </VictoryChart>
      </>
    );
  }
}

export default AudienceGraph;
