import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
// import path from "path";

//? EXPRESS
const app = express();

//? PORTS
// eslint-disable-next-line no-undef
const SERVER_PORT = process.env.SERVER_PORT || 5000;

//? CONTROLLERS
import getRouter from "./routers/getRouter.js";

//* ROUTES
app.use("/", getRouter);

app.use(json());
app.use(cors());

// Get the directory path using import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // eslint-disable-next-line no-undef
// app.use(express.static(path.join(__dirname, "dist")));

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);
