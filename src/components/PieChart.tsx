import { ResponsivePie } from "@nivo/pie";
import React from "react";

interface PieChartProps {
  data: { id: string; label: string; value: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={5}
        colors={[
          "#e0b3f2",
          "#d17ae8",
          "#a45ed7",
          "#9b39c9",
          "#7e1da3",
          "#6b1f82"
        ]}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333"
        arcLinkLabelsThickness={2}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        motionConfig="gentle"
        animate={true}
        transitionMode="startAngle"
      />
    </div>
  );
};

export default PieChart;
