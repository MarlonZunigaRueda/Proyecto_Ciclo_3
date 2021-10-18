const {
  users
} = require("../models/index.js");

module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/create", users.create);

  // Retrieve all Users
  router.get("/retrieve", users.findAll);

  // Retrieve all the users who are Clients
  router.get("/clients", users.findAllClients);

  // Retrieve all the users who are Sellers
  router.get("/sellers", users.findAllSellers);

  // Retrieve a single User with id
  router.get("/retrieve/:id", users.findOne);

  // Update a User with id
  router.put("/update/:id", users.update);

  // Find Clients which name contains an text
  router.get("/find/:name", users.findForContains);

  // Find Clients which name contains an text
  router.get("/verify/:token", users.verify);

  // Delete all Users
  router.delete("/delete", users.deleteAll);

  app.use('/api/users', router);
};