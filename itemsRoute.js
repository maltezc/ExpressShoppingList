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
  const item = db.items[itemIndex];
  return res.json({ item }) // FIXME: Why the squiggly brackets?
})

router.patch("/:name", function (req, res) {
  const updatingItemIndex = db.items.findIndex(item => item.name === req.params.name)
  const updatingItem = db.items[updatingItemIndex];
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  updatingItem.name = updatedName;
  updatingItem.price = updatedPrice;
  return res.json({updatingItem})
})


router.delete("/:name", function (req, res) {
  const message = "deleted"

  const updatingItemIndex = db.items.findIndex(item => item.name === req.params.name)
  db.items.splice(updatingItemIndex, 1)

  return res.json({message})
})



module.exports = router;
