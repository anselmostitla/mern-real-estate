
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, 'must provide username'],
      unique: true,

   },
   email: {
      type: String,
      required: [true, 'must provide email'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'must provide password'],
   },
   avatar: {
      type: String,
      default: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
   }
},{timestamps: true})
  
const User = mongoose.model("User", userSchema)
export default User