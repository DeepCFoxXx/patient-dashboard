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
        colors={[
          "#e0b3f2",
          "#d17ae8",
          "#a45ed7",
          "#9b39c9",
          "#7e1da3",
          "#6b1f82"
        ]}
        lineWidth={3}
        pointSize={10}
        pointBorderWidth={2}
        pointBorderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        areaOpacity={0.1}
        animate={true}
        motionConfig="default"
      />
    </div>
  );
};

export default LineChart;
