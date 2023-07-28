import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Course = model("Course", courseSchema);

export default Course;
