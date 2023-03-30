const express = require("express");
const router = express.Router();
const mtg = require("mtgsdk");

// Filter Cards
router.get("/test", (req, res) => {
  mtg.card.all({ name: "Experiment One" }).on("data", (card) => {
    res.json({name:card.name, image:card.imageUrl});
  });
});

module.exports = router;
