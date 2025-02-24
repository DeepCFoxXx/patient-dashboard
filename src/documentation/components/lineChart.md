# LineChart Component

## Overview

The `LineChart` component is a customizable line chart built using the `@nivo/line` library and React. It visualizes data points as lines connecting multiple coordinates, providing an intuitive representation of trends over time.

## Installation

To use the `LineChart` component, ensure you have `@nivo/line` and `react` installed in your project. If you haven't installed these yet, you can do so with the following command:

```bash
npm install @nivo/line react
Props
The LineChart component accepts the following props:

data
Type: Array<{ id: string; data: { x: string; y: number }[] }>
Required: Yes
Description: An array of objects representing the data to be displayed in the line chart. Each object should contain:
id: A string that identifies the line (e.g., a label).
data: An array of objects with x and y properties, where:
x: A string representing the x-axis value (e.g., date or category).
y: A number representing the y-axis value.
Usage
Here’s an example of how to use the LineChart component in your React application:

jsx
Copy
Edit
import React from 'react';
import LineChart from './LineChart';

const data = [
  {
    id: 'Series A',
    data: [
      { x: '2025-01-01', y: 10 },
      { x: '2025-01-02', y: 20 },
      { x: '2025-01-03', y: 30 },
      { x: '2025-01-04', y: 25 },
    ],
  },
  {
    id: 'Series B',
    data: [
      { x: '2025-01-01', y: 5 },
      { x: '2025-01-02', y: 15 },
      { x: '2025-01-03', y: 25 },
      { x: '2025-01-04', y: 30 },
    ],
  },
];

const App = () => {
  return (
    <div>
      <h1>My Line Chart</h1>
      <LineChart data={data} />
    </div>
  );
};

export default App;
Customization
Chart Dimensions
The chart has a fixed height of 400px and a width of 100%, which can be adjusted as needed.
Chart Colors
The chart supports a custom color palette defined in the colors array. Modify this array to change the color scheme of the lines.
Animation
The lines have an animated effect enabled by default, with the motionConfig set to "default". You can customize the animation settings as needed.
Point Configuration
You can customize the size and border of the points on the line with pointSize, pointBorderWidth, and pointBorderColor properties.
Notes
Ensure that the data provided matches the expected structure to avoid rendering issues.
The chart's x-axis uses a point scale, making it suitable for categorical data. Adjust the scale type if necessary for your data.
