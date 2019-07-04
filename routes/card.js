const { Router } = require("express");

const Card = require("../models/card");
const Course = require("../models/course");

const router = Router();

router.post("/add", async (req, res, next) => {
  const { id } = req.body;
  const course = await Course.find(id);
  await Card.add(course);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res, next) => {
  const { id } = req.params;
  const card = await Card.remove(id);
  res.status(200).json(card);
});

router.get("/", async (req, res, next) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Card",
    isCard: true,
    courses: card.courses,
    price: card.price
  });
});

module.exports = router;
