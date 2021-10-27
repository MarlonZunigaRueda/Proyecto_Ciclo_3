const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

const db = require("./app/models");
const Role = db.role;
const UserStatus = db.user_status;
const ProductStatus = db.product_status;
const SaleStatus = db.sale_status;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API Gestión de Ventas."
  });
});

require("./app/routes/user.routes")(app);
require("./app/routes/sale.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        value: "01",
        name: "ADMINISTRADOR"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ADMINISTRADOR' to roles collection");
      });

      new Role({
        value: "02",
        name: "VENDEDOR"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'VENDEDOR' to roles collection");
      });

      new Role({
        value: "03",
        name: "CLIENTE"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'CLIENTE' to roles collection");
      });
    }
  });

  UserStatus.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new UserStatus({
        value: "01",
        name: "AUTORIZADO"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'AUTORIZADO' to status collection");
      });

      new UserStatus({
        value: "02",
        name: "PENDIENTE"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'PENDIENTE' to status collection");
      });

      new UserStatus({
        value: "03",
        name: "NO AUTORIZADO"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'NO AUTORIZADO' to status collection");
      });

    }
  });

  ProductStatus.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new ProductStatus({
        value: "01",
        name: "DISPONIBLE"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'DISPONIBLE' to status collection");
      });

      new ProductStatus({
        value: "02",
        name: "NO DISPONIBLE"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'NO DISPONIBLE' to status collection");
      });

    }
  });

  SaleStatus.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new SaleStatus({
        value: "01",
        name: "EN PROCESO"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'EN PROCESO' to status collection");
      });

      new SaleStatus({
        value: "02",
        name: "CANCELADA"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'CANCELADA' to status collection");
      });

      new SaleStatus({
        value: "03",
        name: "ENTREGADA"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'FINALIZADA' to status collection");
      });
    }
  });
}