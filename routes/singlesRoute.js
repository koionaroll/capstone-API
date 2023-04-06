const express = require("express");
const router = express.Router();
const axios = require("axios");
const SCRYFALL_UR = "https://api.scryfall.com/cards/named?fuzzy=";

router.get("/:value", (req, res) => {
  const value = req.params.value;
  axios
    .get(`${SCRYFALL_UR}${value}`)
    .then((response) => {
      res.json({
        id: response.data.id,
        name: response.data.name,
        img: response.data.image_uris.png,
      });
    })
    // .catch((err) => {
    //   res.send("Did not find card: ", err);
    // });
  });

module.exports = router;
