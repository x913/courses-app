const { Router } = require("express");
const Course = require("../models/course");

const router = Router();

router.get("/", async (req, res) => {
  const courses = await Course.getAll();
  res.render("courses", { title: "Courses", isHome: true, courses: courses });
});

router.get("/:id/edit", async (req, res, next) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const { id } = req.params;
  const course = await Course.find(id);
  if (course) {
    res.render("course-edit", { title: "Course edit", course: course });
  }
});

router.post("/edit", async (req, res, next) => {
  const { id, title, price, image } = req.body;
  const course = new Course(title, price, image, id);
  await course.save();
  return res.redirect("/courses");
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.find(id);
  if (course)
    res.render("course", { layout: "empty", title: `Course`, course: course });
  else next();
});

module.exports = router;
