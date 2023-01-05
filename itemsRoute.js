const express = require("express");

const db = require("./fakeDb");
const { NotFoundError } = require("./expressError");
const router = new express.Router();

router.get("/", function (req, res) {
  const items = db.items;
  return res.json({ items });
});

router.post("/", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  db.items.push(newItem);
  const pushedItem = db.items[db.items.length - 1]
  return res.status(201).json({ added: pushedItem })
});

router.get("/:name", function (req, res) {
  const itemIndex = db.items.findIndex(item => item.name === req.params.name)
  const item = db.items[itemIndex];
  if (item === undefined) { throw new NotFoundError() }
  return res.json({ item }) // FIXME: Why the squiggly brackets?
})

router.patch("/:name", function (req, res) {
  const updatingItemIndex = db.items.findIndex(item => item.name === req.params.name)
  const updatingItem = db.items[updatingItemIndex];
  if (updatingItem === undefined) { throw new NotFoundError() }
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  updatingItem.name = updatedName;
  updatingItem.price = updatedPrice;
  return res.json({ updatingItem })
})


router.delete("/:name", function (req, res) {
  const message = "Deleted"

  const updatingItemIndex = db.items.findIndex(item => item.name === req.params.name)
  db.items.splice(updatingItemIndex, 1)

  return res.json({ message })
})



module.exports = router;
