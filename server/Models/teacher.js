import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const teacherSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
        type: String,
    },
    cnic: {
      type: Number,
      required: true,
    },
    
    contact: {
        type: String,
      },
    courses: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
