import path from "path";
import { getBooks } from "../database.js"; // Adjust the path according to your project structure

/**
 * Defines the routes for the main application
 * @param {*} app: Express instance
 * @param {*} baseDir: The base directory passed from the main file
 */
export default function mainRoutes(app, baseDir) {
  app.get("/", (req, res) => {
    res.render("index.html", { pageTitle: "dynamic" });
  });

  app.get("/search", (req, res) => {
    res.sendFile(path.join(baseDir, "views", "search.html"));
  });

  app.get("/search-result", function (req, res) {
    console.log(req.query);
    res.send("You entered: " + req.query.keyword);
  });

  app.get("/register", function (req, res) {
    res.sendFile(path.join(baseDir, "views", "register.html"));
  });

  app.post("/registered", function (req, res) {
    res.send(req.body);
  });

  app.get("/list", async (req, res) => {
    try {
      const result = await getBooks();
      res.send(result);
    } catch (error) {
      res.status(500).send("Error retrieving books");
    }
  });
}
