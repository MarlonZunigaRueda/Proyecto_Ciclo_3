const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        Role.find({
                _id: user.role

            },
            (err, role) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }

                if (role.value === "01") {
                    next();
                    return;
                }

                res.status(403).send({
                    message: "Require Admin Role!"
                });
                return;
            }
        );
    });
};

isSeller = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        Role.find({
                _id: user.role
            },
            (err, role) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }

                if (role.value === "02") {
                    next();
                    return;
                }

                res.status(403).send({
                    message: "Require Seller Role!"
                });
                return;
            }
        );
    });
};


isEmployee = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        Role.find({
                _id: user.role
            },
            (err, role) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }

                if (role.value === "01" || role.value === "02") {
                    next();
                    res.send({
                        isEmployee: true
                    })
                    return;
                }

                res.status(200).send({
                    isEmployee: false
                });
                return;
            }
        );
    });
};

const AuthJwt = {
    verifyToken,
    isAdmin,
    isSeller
};
module.exports = AuthJwt;