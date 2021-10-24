module.exports = mongoose => {

  var schema = mongoose.Schema({
    amount: Number,
    total: Number,
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SaleState"
    },
    registeredBy: {
      nameEmployee: String,
      idEmployee: String
    },
    boughtBy: {
      nameClient: String,
      idClient: String
    },
    productsBox: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }]
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