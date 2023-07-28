import { Router } from "express";
import Course from "../models/course_schema.js";
import protectApi from "../utils/protection.js";

const courseRoutes = Router();

//Create a post
courseRoutes.post("/course/create", protectApi, async (req, res) => {
  try {
    const action = await Course.create(req.body);
    return res.json(
      action ? { result: true, course: action } : { result: false }
    );
  } catch (error) {
    res.status(401).json({ error });
  }
});

//Read all post
courseRoutes.get("/course/get-course/:email", protectApi, async (req, res) => {
  try {
    let email = req.params.email;
    const course = await Course.find({ email });
    return res.json({ course });
  } catch (error) {
    res.status(404).json({ error });
  }
});

export default courseRoutes;
