const db = require("../models");
const Product = db.products;
const ProductStatus = db.product_status;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description || !req.body.amount || !req.body.unitValue) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = new Product({
    description: req.body.description,
    state: req.body.state,
    amount: req.body.amount,
    unitValue: req.body.unitValue,
    registeredBy: req.body.registeredBy
  });

  ProductStatus.findOne({
    value: req.body.state
  }, (err, state) => {
    if (err) {
      res.status(500).send({
        message: err,
        successful: true
      });
      return;
    }
    if (!state) {
      return res.status(404).send({
        message: "Estado no encontrado.",
        successful: false
      });
    }
    product.state = new ProductStatus({
      name: state.name,
      value: state.value
    });

    // Save Product in the database
    product
      .save(product)
      .then(data => {
        res.send({
          message: "¡Producto creado!",
          successful: true
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Product.",
          successful: false
        });
      });
  })


};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description ? {
    description: {
      $regex: new RegExp(`.*${description}.*`),
      $options: "i"
    }
  } : {};

  Product.find(condition)
    .then(data => {
      res.send({
        products: data,
        message: "¡Productos encontrados!",
        successful: true
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Products.",
        successful: false
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found Product with id " + id,
          successful: false
        });
      else res.send({
        product: data,
        message: "¡Producto encontrado!",
        successful: true
      });
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving Product with id=" + id,
          successful: false
        });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  // Create a Product
  const product = {
    description: req.body.description,
    amount: req.body.amount,
    unitValue: req.body.unitValue,
    registeredBy: req.body.registeredBy
  };

  const id = req.params.id;

  ProductStatus.findOne({
    value: req.body.state
  }, (err, state) => {
    if (err) {
      res.status(500).send({
        message: err,
        successful: true
      });
      return;
    }
    if (!state) {
      return res.status(404).send({
        message: "Estado no encontrado.",
        successful: false
      });
    }
    product.state = new ProductStatus({
      name: state.name,
      value: state.value
    });

    Product.findByIdAndUpdate(id, product, {
      useFindAndModify: true
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`
        });
      } else res.send({
        message: "Product was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Product with id=" + id
      });
    });

  })


};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Product were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Products."
      });
    });
};