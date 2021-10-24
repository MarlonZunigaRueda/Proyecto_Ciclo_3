const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.role = require("./role.model.js")(mongoose);
db.ROLES = [{"value": "01","name":"ADMINISTRADOR"}, {"value": "02","name":"VENDEDOR"}, {"value": "03","name":"CLIENTE"}];
db.user_status = require("./user_status.model.js")(mongoose);
db.USER_STATUS = [{"value": "01","name":"ACTIVO"}, {"value": "02","name":"INACTIVO"}];
db.product_status = require("./product_status.model.js")(mongoose);
db.PRODUCT_STATUS = [{"value": "01","name":"DISPONIBLE"}, {"value": "02","name":"NO DISPONIBLE"}];
db.sale_status = require("./sale_status.model.js")(mongoose);
db.SALE_STATUS = [{"value": "01","name":"EN PROCESO"}, {"value": "02","name":"CANCELADA"}, {"value": "03","name":"FINALIZADA"}];
db.users = require("./user.model.js")(mongoose);
db.sales = require("./sale.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);

module.exports = db;