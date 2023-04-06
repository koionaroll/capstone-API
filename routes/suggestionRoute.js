const express = require("express");
const router = express.Router();
const axios = require("axios");
const SCRYFALL_URL = "https://api.scryfall.com/cards/autocomplete?q=";


router.get("/:value", (req, res) => {
  const value = req.params.value;
  axios
    .get(`${SCRYFALL_URL}${value}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.send("Did not find card: ", err);
    });
});

module.exports = router;
