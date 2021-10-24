module.exports = mongoose => {
  var schema = mongoose.Schema({
    description: String,
    amount: Number,
    unitValue: Number,
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductState"
    },
    registeredBy: {
      nameEmployee: String,
      idEmployee: String
    }
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

  const Product = mongoose.model("product", schema);
  return Product;
};