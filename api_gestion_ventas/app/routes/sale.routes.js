const {
  products
} = require("../models/index.js");

module.exports = app => {
  const sales = require("../controllers/sale.controller.js");

  var router = require("express").Router();

  // Create a new Sale
  router.post("/create", sales.create);

  // Retrieve all Sales
  router.get("/retrieve", sales.findAll);

  // Retrieve a single Sale with id
  router.get("/retrieve/:id", sales.findOne);

  // Update a Sale with id
  router.put("/update/:id", sales.update);

  // Delete all Sales
  router.delete("/delete", sales.deleteAll);

  app.use('/api/sales', router);
};