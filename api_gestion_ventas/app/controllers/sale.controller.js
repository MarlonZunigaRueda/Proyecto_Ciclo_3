const db = require("../models");
const Sale = db.sales;

// Create and Save a new Sale
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Sale
  const sale = new Sale({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Sale in the database
  sale
    .save(sale)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sale."
      });
    });
};

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Sale.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sales."
      });
    });
};

// Find a single Sale with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sale.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Sale with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Sale with id=" + id });
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

  Sale.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found!`
        });
      } else res.send({ message: "Sale was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id
      });
    });
};

// Delete a Sale with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sale.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Sale with id=${id}. Maybe Sale was not found!`
        });
      } else {
        res.send({
          message: "Sale was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sale with id=" + id
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
        message:
          err.message || "Some error occurred while removing all Sales."
      });
    });
};

// Find all published Sales
exports.findAllPublished = (req, res) => {
  Sale.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sales."
      });
    });
};