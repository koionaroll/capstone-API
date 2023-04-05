const express = require("express");
const router = express.Router();
const decklists = require("../data/decklists.json");
const fs = require("fs");
const uuid = require("uuid");

function readUpload() {
  const deckFile = fs.readFileSync("./data/decklists.json");
  const deckInfo = JSON.parse(deckFile);
  return deckInfo;
}

function writeUpload(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/decklists.json", stringifiedData);
}

router.post("/decklist", (req, res) => {
  const deck = readUpload();

  const body = req.body;
  const title = body.deckname;
  const list = body.cardlist;

  const newdeck = {
    id: uuid.v4(),
    deckname:title,
    timestamp: Date.now(),
    cardlist: list,
  };

  deck.push(newdeck);
  writeUpload(deck);
  res.status(201).send();
});

module.exports = router;