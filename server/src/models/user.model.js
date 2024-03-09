import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },
  profile: {
    type: String,
    default: ""
  },
},
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;