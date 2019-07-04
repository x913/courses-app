const { Router } = require("express");
const Course = require("../models/course");

const router = Router();

router.get("/", (req, res) => {
  res.render("add", { title: "Add Course", isHome: true });
});

router.post("/", async (req, res) => {
  const { title, price, image } = req.body;
  const course = new Course(title, price, image);
  await course.save();
  res.redirect("/courses");
});

module.exports = router;
