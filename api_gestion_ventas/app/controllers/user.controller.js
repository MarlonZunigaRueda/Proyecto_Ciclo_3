const db = require("../models");
const User = db.users;
const Role = db.role;
const UserStatus = db.user_status;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.password || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = new User({
    fullname: req.body.fullname,
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
          message: "Not found User with id " + id,
          successful: false
        });
      else res.send({
        user: data,
        message: "¡Usuario encontrado!",
        successful: true
      });
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving User with id=" + id,
          successful: false
        });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "¡Los datos para actualizar no pueden estar vacíos!",
      successful: false
    });
  }

  const user = {
    fullname: req.body.fullname
  };

  const id = req.params.id;

  Role.findOne({
    value: req.body.role
  }, (err, role) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }
    if (!role) {
      return res.status(404).send({
        message: "Role no encontrado.",
        successful: false
      });
    }
    user.role = new Role({
      name: role.name,
      value: role.value
    });

    UserStatus.findOne({
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
      user.state = new UserStatus({
        name: state.name,
        value: state.value
      });

      User.findByIdAndUpdate(id, user, {
        useFindAndModify: true
      }).then(data => {

        if (!data) {
          res.status(404).send({
            message: `No se puede actualizar el usuario con id=${id}. ¡Quizás no existe el usuario!`,
            successful: false
          });
        } else res.send({
          message: "¡El usuario se actualizó correctamente!",
          successful: true
        });
      }).catch(err => {
        res.status(500).send({
          message: "Error al actualizar el usuario con id=" + id,
          successful: false
        });
      });
    })
  })
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
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
          successful: false
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
          successful: true
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
        successful: false
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
        successful: true
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
        successful: false
      });
    });
};

// Find all Clients
exports.findAllClients = (req, res) => {
  return this.findAllUsers('03',res);
};

// Find all Employees ["02", "01"]
exports.findAllEmployees = (req, res) => {
  return this.findAllUsers(["02", "01"],res);
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
        message: err.message || "Some error occurred while retrieving Users.",
        successful: false
      });
    });
};

exports.getRole = (req, res) => {

  Role.findById({
    _id: req.params.role
  }, (err, role) => {
    if (err) {
      res.status(500).send({
        message: err,
        successful: false
      });
      return;
    }

    if (!role) {
      return res.status(404).send({
        message: "Rol no encontrado.",
        successful: false
      });
    }

    res.send({
      role: {
        name: role.name,
        value: role.value
      },
      message: "Rol encontrado.",
      successful: true
    })
    return;
  });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};