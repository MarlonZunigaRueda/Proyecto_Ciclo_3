const db = require("../models");
const Sale = db.sales;
const Product = db.products;

// Create and Save a new Sale
exports.create = (req, res) => {
  // Validate request
  if (!req.body.state) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sale
  const sale = new Sale(req.body);

  Product.find({
    '_id': {
      $in: [
        "6178a50f066b60268aa873ab",
        "6178b768ab9fb8ae738e6099"
      ]
    }
  }, (error, products) => {
    if (error) {
      res.status(500).send({
        message: error,
        successful: false
      });
      return;
    }

    if (!products) {
      return res.status(404).send({
        message: "¡Productos no encontrados!",
        successful: false
      });
    }

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      sale.productBox[i] = new Product(item);
    }

    // Save Sale in the database
    sale
      .save(sale)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Sale."
        });
      });
  })


};

exports.findAllUsers = (filter, res) => {

  User.find({
    'role.value': {
      $in: filter
    }
  }, (error, users) => {
    if (error) {
      res.status(500).send({
        message: err,
        successful: false
      });
      return;
    }

    if (!users) {
      return res.status(404).send({
        message: "¡Usuarios no encontrados!",
        successful: false
      });
    }

    res.send({
      users: users,
      message: "¡Usuarios encontrados!",
      successful: true
    });
  })

};

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
  const boughtBy = req.query.boughtBy;
  var condition = boughtBy && boughtBy.value ? {
    boughtBy: {
      $regex: new RegExp(`.*${boughtBy.value}.*`),
      $options: "i"
    }
  } : {};

  Sale.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Sales."
      });
    });
};

// Find a single Sale with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sale.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found Sale with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving Sale with id=" + id
        });
    });
};

// Update a Sale by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Sale.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found!`
        });
      } else res.send({
        message: "Sale was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id
      });
    });
};

// Delete all Sales from the database.
exports.deleteAll = (req, res) => {
  Sale.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Sale were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Sales."
      });
    });
};