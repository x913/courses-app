const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const addRoutes = require("./routes/add");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const coursesRoutes = require("./routes/courses");

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({ defaultLayout: "main", extname: "hbs" });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", hbs.engine); // register engine with name
app.set("view engine", "hbs"); // set view engine
app.set("views", "views"); // path to views folder

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
