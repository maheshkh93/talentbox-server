import { Router } from "express";
import Course from "../models/course_schema.js";
import protectApi from "../utils/protection.js";

const courseRoutes = Router();

//Read all post
courseRoutes.get("/course/get-course/", protectApi, async (req, res) => {
  try {
    const course = await Course.find();
    return res.json({ course });
  } catch (error) {
    res.status(404).json({ error });
  }
});

export default courseRoutes;
