const {
  authJwt
} = require("../middlewares/index.middleware");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Retrieve all Users
  router.get("/retrieve", [authJwt.verifyToken], controller.findAll);

  // Retrieve all the users who are Clients
  router.get("/clients", [authJwt.verifyToken], controller.findAllClients);

    // Retrieve all the users who are Employees
    router.get("/employees", [authJwt.verifyToken], controller.findAllEmployees);

  // Retrieve a single User with id
  router.get("/retrieve/:id", [authJwt.verifyToken], controller.findOne);

  // Update a User with id
  router.put("/update/:id", [authJwt.verifyToken], controller.update);

  // Find Clients which name contains an text
  router.get("/find/:name", [authJwt.verifyToken], controller.findForContains);

  // Retrieve a single Role with id
  router.get("/getRole/:role", [authJwt.verifyToken], controller.getRole);

  // Delete all Users
  router.delete("/delete", [authJwt.verifyToken], controller.deleteAll);

  router.get("/access", controller.allAccess);

  app.use('/api/users', router);
};