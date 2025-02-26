# Patient Dashboard

The **Patient Dashboard** is a full-stack web application designed to display therapy session activity and patient details, offering visual insights into session metrics.

The frontend is built with **React** and **TypeScript**, while the backend is powered by **Node.js**, **Express**, and **MongoDB**.

## Features

### Frontend

- **Patient Details**: Displays the patient's name, date of birth, and other basic information.
- **Bar Graph Visualization**: A stacked bar graph showing total repetitions completed by the patient per day, with each bar representing individual therapy sessions.
- **Summary Statistics**:
  - Average reps per session
  - Average therapy duration per session
  - Average RPE (Rate of Perceived Exertion) per session
- **Responsive Design**: Works on both desktop and mobile devices.

### Backend

- **User Authentication**: Secure login and registration system with JWT-based authentication.
- **REST API**:
  - **Patients API**: Retrieves patient data from MongoDB.
  - **Activity Logs API**: Fetches session logs to display therapy metrics.
  - **Database Population Scripts**: Scripts to seed the MongoDB database with sample patient data.
- **MongoDB Integration**:
  - Stores patient records and therapy session logs.
  - Provides endpoints to query and retrieve relevant data.

## Requirements

To run this project locally, ensure you have the following installed:

- **Node.js** (>= v16.0.0)
- **npm**
- **MongoDB Community Edition** (see [set-up-mongodb.md](./src/documentation/set-up-mongodb.md) for installation)

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/DeepCFoxXx/patient-dashboard
cd patient-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Frontend + API

```bash
npm run dev
```

The frontend will be available at <http://localhost:5173/> (or a different port if configured).

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and set the required variables:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/patient-dashboard
JWT_SECRET=your-secret-key
```

### 5. Populate the Database

populate the MongoDB database with sample data:

```bash
node scripts/populate-db.js
```

For detailed instructions, refer to `populate-db.md`.
(see [populate-db.md](./src/documentation/how-toos/populate-db.md) for usage)

## API Endpoints

The backend exposes RESTful API endpoints to interact with patient and activity data.

### Patients API

- `GET /api/patients` – Fetch all patients.

### Activity Logs API

- `GET /api/activity-logs` – Fetch all activity logs.

For a full list of API endpoints, refer to the backend documentation.
`patient-dashboard/src/documentation/api-service`

## Documentation

All documentation files are available in the `patient-dashboard/src/documentation` directory:

## Troubleshooting

If you encounter issues, check the following:

- Ensure MongoDB is running (`mongod --config /usr/local/etc/mongod.conf`).
- Verify your `.env` file is correctly configured.
- Check the logs for errors (`npm run dev` in the backend).

## User Experience

For the best user experience, please use Chrome Incognito mode.
