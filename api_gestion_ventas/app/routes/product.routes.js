const {
  authJwt
} = require("../middlewares/index.middleware");

const controller = require("../controllers/product.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new Product
  router.post("/create", [authJwt.verifyToken], controller.create);

  // Retrieve all Products
  router.get("/retrieve", [authJwt.verifyToken], controller.findAll);

  // Retrieve a single Product with id
  router.get("/retrieve/:id", [authJwt.verifyToken], controller.findOne);

  // Update a Product with id
  router.put("/update/:id", [authJwt.verifyToken], controller.update);

  // Delete all Products
  router.delete("/delete", [authJwt.verifyToken], controller.deleteAll);

  app.use('/api/products', router);
};