import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      require: [true, 'must provide username'],
      unique: true,

   },
   email: {
      type: String,
      require: [true, 'must provide email'],
      unique: true,
   },
   password: {
      type: String,
      require: [true, 'must provide password'],
   }
},{timestamps: true})

export default User = mongoose.model("User", userSchema)