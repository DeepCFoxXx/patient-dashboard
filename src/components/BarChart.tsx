import { ResponsiveBar } from "@nivo/bar";
import React from "react";

interface BarChartProps {
  data: { date: string; totalReps: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["totalReps"]}
        indexBy="date"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        colors={[
          "#e0b3f2",
          "#d17ae8",
          "#a45ed7",
          "#9b39c9",
          "#7e1da3",
          "#6b1f82"
        ]}
        borderRadius={4}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
        enableLabel={false}
        animate={true}
        motionConfig="wobbly"
      />
    </div>
  );
};

export default BarChart;
