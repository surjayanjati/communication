import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.config";
import { startNotificationConsumer } from "./utils/messageBrokerUtils";
dotenv.config();
let portNo = process.env.PORT;
const app = express();

app.use(express.json());

///// Function for listening to the server ----------------------------/
function startServer() {
  //// Connecting to the database ----------/
  connectToDatabase();

  //// Funciton for listening to the notification ---------------/
  console.log("starting notification service...");

  console.log("started consumer...");
  //// listening to the server --------------/
  app.listen(portNo, () => {
    console.log(`listening to port not ${portNo}`);
  });
  setTimeout(() => {
    startNotificationConsumer();
  }, 5000);
}
startServer();
