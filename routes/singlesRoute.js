const express = require("express");
const router = express.Router();
const axios = require("axios");
const SCRYFALL_URL = "https://api.scryfall.com/cards/named?fuzzy="

const cardname = "black lotus"

// router.get("/test", (req, res) => {

//   axios.get(`${SCRYFALL_URL}${cardname}`).then((response) => {
//     res.json({
//       id:response.data.id, 
//       name:response.data.name, 
//       img:response.data.image_uris.png
//     });
//   });
// });

router.get("/:value", (req, res) => {
  const value = req.params.value;
  console.log(value)
  axios.get(`${SCRYFALL_URL}${value}}`).then((response) => {
    res.json({
      id:response.data.id, 
      name:response.data.name, 
      img:response.data.image_uris.png
    });
  });
});

module.exports = router;
