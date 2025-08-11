// itemsRoutes.js
const express = require("express");
const router = new express.Router();
let items = require("./fakeDb");

// GET /items - return list of items
router.get("/", (req, res) => {
  return res.json(items);
});

// POST /items - add new item
router.post("/", (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  const newItem = { name, price };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

// GET /items/:name - get item by name
router.get("/:name", (req, res) => {
  const item = items.find((i) => i.name === req.params.name);
  if (!item) return res.status(404).json({ error: "Item not found" });
  return res.json(item);
});

// PATCH /items/:name - update item
router.patch("/:name", (req, res) => {
  const item = items.find((i) => i.name === req.params.name);
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.name = req.body.name || item.name;
  item.price = req.body.price !== undefined ? req.body.price : item.price;

  return res.json({ updated: item });
});

// DELETE /items/:name - delete item
router.delete("/:name", (req, res) => {
  const index = items.findIndex((i) => i.name === req.params.name);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  items.splice(index, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
