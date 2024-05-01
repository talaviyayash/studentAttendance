import mongoose from "mongoose";
const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    subject : {
        type : Array
    },
    college : {
        type: mongoose.Types.ObjectId,
        ref: "college",
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("course", courseSchema);