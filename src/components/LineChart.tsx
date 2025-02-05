import { ResponsiveLine } from "@nivo/line";
import React from "react";

interface LineChartProps {
  data: { id: string; data: { x: string; y: number }[] }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        colors={{ scheme: "set2" }}
        lineWidth={3}
        pointSize={10}
        pointBorderWidth={2}
        pointBorderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        // enableArea={true}
        areaOpacity={0.1}
        animate={true}
        motionConfig="default"
      />
    </div>
  );
};

export default LineChart;
