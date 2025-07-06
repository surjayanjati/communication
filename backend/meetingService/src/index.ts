import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/dbConfig";
import meetingRoutes from "./routes/metting.route";
const app = express();

dotenv.config();
let portNo = process.env.PORT;
app.use(express.json());

//// Using the routers --------------------------------/
app.use("/api/v1", meetingRoutes);
///// Function for starting the server ----------------/
function startServer() {
  //// connecting to the database ---/
  connectToDatabase();

  app.listen(portNo, () => {
    console.log(`listening to port no ${portNo}`);
  });
}
startServer();
