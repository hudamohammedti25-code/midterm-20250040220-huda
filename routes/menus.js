const { requireAuth } = require('../middleware');
const express = require('express');
const router = express.Router();

let menus = [
  { id: 1, name: 'Espresso', category: 'coffee', price: 15000, stock: 50 },
  { id: 2, name: 'Cappuccino', category: 'coffee', price: 22000, stock: 40 },
  { id: 3, name: 'Green Tea', category: 'tea', price: 18000, stock: 30 },
  { id: 4, name: 'Croissant', category: 'pastry', price: 20000, stock: 25 },
  { id: 5, name: 'Chocolate Cake', category: 'pastry', price: 28000, stock: 15 },
];
let nextId = menus.length + 1;

// Helper: find an item or throw a 404 error
function findMenu(id) {
  const item = menus.find((m) => m.id === Number(id));
  if (!item) {
    const err = new Error('Menu not found');
    err.status = 404;
    throw err;
  }
  return item;
}

// Check that the body has valid fields
function isValid(body) {
  return body.name && body.category
    && typeof body.price === 'number'
    && typeof body.stock === 'number';
}

router.route('/')
  .get((req, res) => {
    res.json(menus);
  })
  .post((req, res) => {
    const body = req.body || {};
    if (!isValid(body)) {
      return res.status(400).json({ error: 'name, category, price and stock are required' });
    }
    const newItem = {
      id: nextId++,
      name: body.name,
      category: body.category,
      price: body.price,
      stock: body.stock,
    };
    menus.push(newItem);
    res.status(201).json(newItem);
  });

  // Optional part: /menus/category  or  /menus/category/coffee
router.get('/category{/:name}', (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.json(menus);
  }
  const result = menus.filter((m) => m.category === name.toLowerCase());
  res.json(result);
});

// Search by name using a query string: /menus/search?name=latte
router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'name query is required' });
  }
  const result = menus.filter((m) =>
    m.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json(result);
});

router.route('/:id')
  .get(async (req, res) => {
    res.json(findMenu(req.params.id));
  })
  .put(async (req, res) => {
    const item = findMenu(req.params.id);
    const body = req.body || {};
    if (!isValid(body)) {
      return res.status(400).json({ error: 'name, category, price and stock are required' });
    }
    item.name = body.name;
    item.category = body.category;
    item.price = body.price;
    item.stock = body.stock;
    res.json(item);
  })
.delete(requireAuth, async (req, res) => {  
    const item = findMenu(req.params.id);
    menus.splice(menus.indexOf(item), 1);
    res.json({ message: 'Menu deleted', item });
  });

module.exports = router;
