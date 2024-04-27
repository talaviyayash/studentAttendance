import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    college: {
      type: mongoose.Types.ObjectId,
      ref: "college",
    },
    class: {
        type: mongoose.Types.ObjectId,
        ref: "class",
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("class", classSchema);
