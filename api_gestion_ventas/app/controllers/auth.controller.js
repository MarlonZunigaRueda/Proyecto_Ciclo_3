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
    const state = new  UserStatus ({name: req.body.state.name, value: req.body.state.value});
    user.state = {
        name: state.name,
        value: state.value,
    }

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

            user.role = role._id;
            user.save(err => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }

                res.send({
                    message: "User was registered successfully!"
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

            Role.find({
                    _id: user.role
                },
                (err, role) => {
                    if (err) {
                        res.status(500).send({
                            message: err,
                            successful: false
                        });
                        return;
                    }

                    if (!role) {
                        return res.status(404).send({
                            message: "User Not found.",
                            successful: false
                        });
                    }

                    if (role[0].value === "01" || role[0].value == "02" ) {
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
                                isEmployee: true,
                                accessToken: token
                            },message: "El usuario es empleado.",
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
                            },message: "El usuario no es empleado.",
                            successful: true
                        });
                        return;
                    }
                }
            );
        });
};