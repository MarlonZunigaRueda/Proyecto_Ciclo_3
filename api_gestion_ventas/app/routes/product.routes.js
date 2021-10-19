const {
  products
} = require("../models/index.js");

module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/create", products.create);

  // Retrieve all Products
  router.get("/retrieve", products.findAll);

  // Retrieve a single Product with id
  router.get("/retrieve/:id", products.findOne);

  // Update a Product with id
  router.put("/update/:id", products.update);

  // Delete all Products
  router.delete("/delete", products.deleteAll);

  app.use('/api/products', router);
};