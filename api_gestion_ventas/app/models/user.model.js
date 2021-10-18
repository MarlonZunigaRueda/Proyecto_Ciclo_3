module.exports = mongoose => {
  var schema = mongoose.Schema({
    name: String,
    status: {
      name: String,
      value: String
    },
    role: {
      name: String,
      value: String
    },
    email: String,
    password: String
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

  const User = mongoose.model("user", schema);
  return User;
};