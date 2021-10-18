const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    status: req.body.status,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? {
    name: {
      $regex: new RegExp(name),
      $options: "i"
    }
  } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found User with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving User with id=" + id
        });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({
        message: "User was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users."
      });
    });
};

// Find all Clients
exports.findAllClients = (req, res) => {
  User.find({
      role: {
        name: "Cliente",
        value: "CLIE"
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Clients."
      });
    });
};

// Find all Sellers
exports.findAllSellers = (req, res) => {
  User.find({
      role: {
        name: "Vendedor",
        value: "VEND"
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Sellers."
      });
    });
};

// Retrieve all Users from the database.
exports.findForContains = (req, res) => {
  const name = req.params.name;

  var condition = {
    name: {
      $regex: new RegExp(`.*${name}.*`),
      $options: "i"
    }
  };

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
};

function concatRegexp(reg, exp) {
  let flags = reg.flags + exp.flags;
  flags = Array.from(new Set(flags.split(''))).join();
  return new RegExp(reg.source + exp.source, flags);
};

// Find a single User with an id
exports.verify = (req, res) => {
  const token = req.params.token;

  const email = token.email;

  User.findById(email)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found User with email " + email
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving User with email=" + email
        });
    });
};