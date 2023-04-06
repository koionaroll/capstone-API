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
    deckname: title,
    timestamp: Date.now(),
    cardlist: list,
  };

  deck.push(newdeck);
  writeUpload(deck);
  res.status(201).send();
});

router.get("/", (req, res) => {
  res.send(decklists);
});

router.get("/:id", (req, res) => {
  const deckID = req.params.id;
  const deck = decklists.find((deck) => deck.id === deckID);

  if (deck) {
    res.json(deck);
  } else {
    res.status(404).send("We can't find the deck");
  }
});

router.patch("/:id", (req, res) => {
  const deck = readUpload();
  const { name, list } = req.body;
  const index = deck.findIndex((item) => item.id === req.params.id);
  deck[index].deckname = name;
  deck[index].cardlist = list;
  writeUpload(deck);
});

router.delete("/delete/:id", (req, res) => {
  const deck = readUpload();
  const newdeck = deck.filter((deck) => deck.id !==req.params.id)
  writeUpload(newdeck);
});

module.exports = router;
