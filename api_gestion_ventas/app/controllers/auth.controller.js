const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const User = db.users;
const Role = db.role;
const UserStatus = db.user_status;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
    Schema
} = require("mongoose");

exports.signup = (req, res) => {
    const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

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
                        message: err
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

                user.save(err => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }
                    res.send({
                        message: "¡El usuario se registró correctamente!!"
                    });
                });

            });
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .populate(mongoose.Role)
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({
                    message: err,
                    successful: false
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: "User Not found.",
                    successful: false
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                    successful: false
                });
            }
            if (user.role && (user.role.value === "01" || user.role.value == "02")) {

                if (user.state && user.state.value !== "01") {
                    res.status(401).send({

                        message: "El empleado no está autorizado.",
                        successful: false
                    });
                    return;
                }

                var token = jwt.sign({
                    id: user.id
                }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });

                res.send({
                    user: {
                        id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        role: user.role,
                        state: user.state,
                        isEmployee: true,
                        accessToken: token
                    },
                    message: "El usuario es empleado.",
                    successful: true
                })
                return;
            } else {

                res.status(401).send({
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        isEmployee: false
                    },
                    message: "El usuario no es empleado.",
                    successful: true
                });
                return;
            }

        });
};