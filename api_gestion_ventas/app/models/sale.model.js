module.exports = mongoose => {
  
  var selectedItem = mongoose.Schema({
    item: {
      nameProduct: String,
      idProduct: String
    }
  });

  var schema = mongoose.Schema({
    status: {
      name: String,
      value: String
    },
    registeredBy: {
      nameEmployee: String,
      idEmployee: String
    },
    boughtBy: {
      nameClient: String,
      idClient: String
    },
    productsBox: [selectedItem],
    total: Number
  }, {
    timestamps: true
  });

  schema.method("toJSON", function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sale = mongoose.model("sale", schema);
  return Sale;
};