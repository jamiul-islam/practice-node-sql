import express from "express";
import ejs from "ejs";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mainRoutes from "./routes/main.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

// Initializing routes and passing __dirname
mainRoutes(app, __dirname);

app.listen(port, () => {
  console.log("server has started on port", port);
});
