# MongoDB Data Population Script

## Overview

This guide explains how to use the provided Node.js script to populate a MongoDB database with data from two JSON files: `activityLogs.ts` and `patientData.ts`. The script connects to a MongoDB instance, inserts the data into collections, and verifies the process.

## Prerequisites

Before running the script, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
- NPM (comes with Node.js)

## Configuration

### Setting Up Environment Variables

Create a `.env` file in the project root and define your MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017/your_database_name
```

## Running the Script

```bash
patient-dashboard/src/script/populateDB.ts
```

To execute the script and populate the database, run:

```bash
node populateDB.js
```

### Expected Output

If successful, you should see messages like:

```
Connected to MongoDB...
Inserted X documents into the 'patients' collection.
Inserted Y documents into the 'activityLogs' collection.
Database population completed successfully!
```

## Verifying Data Insertion

You can verify the data using the MongoDB shell (`mongosh`):

1. Open the MongoDB shell:

   ```bash
   mongosh
   ```

2. Switch to the database:

   ```javascript
   use patientDB
   ```

3. Check inserted documents:

   ```javascript
   db.patients.find().pretty()
   db.activityLogs.find().pretty()
   ```

## Troubleshooting

- If the script fails to connect, ensure MongoDB is running:

  ```bash
  brew services start mongodb-community
  ```

- If you encounter an authentication error, ensure your `MONGO_URI` in `.env` is correct.
- To debug, add `console.log()` statements in the script to inspect data loading.
