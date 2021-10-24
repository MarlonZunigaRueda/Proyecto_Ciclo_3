module.exports = mongoose => {
  var schema = mongoose.Schema({
    name: String,
    value: String
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

  const UserStatus = mongoose.model("user_status", schema);
  return UserStatus;
};