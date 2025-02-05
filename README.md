# Bioliberty Dashboard

This is a dashboard built to display therapy session activity and patient details
It visualizes metrics related to sessions.

The dashboard is built using **React** and **TypeScript**, with responsive visualizations powered by the **Nivo** charting library.

## Features

- **Patient Details**: Displays the patient's name, date of birth, and other basic information.
- **Bar Graph**: A stacked bar graph displaying the total repetitions completed by the patient each day. Each bar is divided into individual therapy sessions.
- **Summary Statistics**: Key metrics displayed as simple statistics, including:
  - Average reps per session
  - Average therapy duration per session
  - Average RPE (Rate of Perceived Exertion) per session
- **Responsiveness**: The dashboard is designed to function well on both desktop and mobile devices.

## Requirements

To run this project locally, you need to have the following installed on your machine:

- **Node.js** (>= v16.0.0)
- **npm**

## Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DeepCFoxXx/patient-dashboard
   cd patient-dashboard

2. **Install Dependencies**:

   ```bash
   npm install

3. **Run App**:

   ```bash
   npm run dev


## More To Add ?

What would I have done if I had more time / what is needed:

1. Further CSS Refinement (Layout / Styling / Branding)
   Its very basic to stay within the time limit
   Could use further fleshing out

2. General Refinement
   Could move functions into a helper section
   Could optimise logic for those functions

3. Went with basic error handling and loading
   This would have to be worked on more

4. Testing both of component composition and how it handles data
   Also on performance and accessibility

5. Documentation (Story-Book)

6. More time spent on responsiveness would need to test further
   And adjust as needed
