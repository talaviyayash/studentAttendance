import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const collegeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    description : {
      type : String
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("college", collegeSchema);