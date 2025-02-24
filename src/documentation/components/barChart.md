# BarChart Component

## Overview

The `BarChart` component is a customizable bar chart built using the `@nivo/bar` library and React. It visualizes data in a responsive manner, adapting to different screen sizes while presenting the total repetitions over specified dates.

## Installation

To use the `BarChart` component, ensure you have `@nivo/bar` and `react` installed in your project. If you haven't installed these yet, you can do so with the following command:

```bash
npm install @nivo/bar react
Props
The BarChart component accepts the following props:

data
Type: Array<{ date: string; totalReps: number }>
Required: Yes
Description: An array of objects representing the data to be displayed in the bar chart. Each object should have:
date: A string representing the date (used as the index for the bars).
totalReps: A number representing the total repetitions for the corresponding date.
Usage
Here’s an example of how to use the BarChart component in your React application:

jsx
Copy
Edit
import React from 'react';
import BarChart from './BarChart';

const data = [
  { date: '2025-01-01', totalReps: 100 },
  { date: '2025-01-02', totalReps: 150 },
  { date: '2025-01-03', totalReps: 200 },
  { date: '2025-01-04', totalReps: 120 },
  { date: '2025-01-05', totalReps: 170 },
];

const App = () => {
  return (
    <div>
      <h1>My Bar Chart</h1>
      <BarChart data={data} />
    </div>
  );
};

export default App;
Customization
Chart Dimensions
The chart has a fixed height of 400px and a width of 100%, which can be adjusted as needed.
Chart Colors
The chart supports a custom color palette defined in the colors array. Modify this array to change the color scheme of the bars.
Animation
The bars have an animated effect enabled by default, with the motionConfig set to "wobbly". You can customize the animation settings as needed.
Notes
Ensure that the data provided matches the expected structure to avoid rendering issues.
The component disables labels on bars (enableLabel={false}) for a cleaner look, but this can be enabled if required by setting it to true.
