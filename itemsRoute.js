const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

router.get("/", function (req, res) {
  const allItems = db.items;
  return res.json({ allItems });
});

router.post("/", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  db.items.push(newItem);
  const pushedItem = db.items[db.items.length - 1]
  return res.json({ added: pushedItem })
});

router.get("/:name", function (req, res) {
  const itemIndex = db.items.findIndex(item => item.name === req.params.name)
  debugger;
  const item = db.items[itemIndex];
  return res.json({ item }) //Why the squiggly brackets?
})

router.patch("/:name", function (req, res) {
  const updatingItemIndex = db.items.findIndex(item => item.name === req.params.name)
  const updatingItem = db.items[updatingItemIndex]
  updatingItem.name
})


module.exports = router;
