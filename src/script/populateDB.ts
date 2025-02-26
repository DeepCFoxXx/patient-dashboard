import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import activityLogs from "../data/activityLogs";
import patientData from "../data/patientData";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "patientDB";

const importData = async () => {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(DB_NAME);

        if (Array.isArray(activityLogs)) {
            const activityCollection = db.collection("activityLogs");
            await activityCollection.insertMany(activityLogs);
            console.log("Inserted activity logs successfully");
        } else {
            console.error("activityLogs is not an array.");
        }

        if (Array.isArray(patientData)) {
            const patientCollection = db.collection("patientData");
            await patientCollection.insertMany(patientData);
            console.log("Inserted patient data successfully");
        } else {
            console.error("patientData is not an array.");
        }

    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
};

importData();
