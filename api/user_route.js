import { Router } from "express";
import jwt from "jsonwebtoken";
import { encryptString } from "../utils/utilities.js";
import User from "../models/user_schema.js";

const userRoutes = Router();

//loging in User
userRoutes.post("/user/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = encryptString(req.body.password);
    const action = await User.find({ email, password });
    const isAuthenticated = action && action.length > 0;

    let token = "";
    if (isAuthenticated) {
      token = jwt.sign(
        {
          data: req.body.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
      );
      let responseObj = {
        result: true,
        user: {
          id: action[0]._id,
          name: action[0].name,
          email: action[0].email,
        },
        token: token,
      };
      return res.json(responseObj);
    } else {
      return res.json({
        result: false,
      });
    }
  } catch (error) {
    res.status(403).json({ error });
  }
});

//creating new User
userRoutes.post("/user/signup", async (req, res) => {
  try {
    let obj = req.body;
    let email = req.body.email;
    let name = req.body.name;
    obj.password = encryptString(obj.password);
    const findname = await User.find({ name });
    if (findname.length > 0)
      return res.json({ message: "This Name already prasent" });
    const findEmail = await User.find({ email });
    if (findEmail.length > 0)
      return res.json({ message: "This Email already prasent" });
    const action = await User.create(obj);
    let token = "";
    if (action) {
      token = jwt.sign(
        {
          data: req.body.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
      );
    }
    let responseObj = {
      result: true,
      user: { id: action._id, name: action.name, email: action.email },
      token: token,
    };
    return res.json(responseObj);
  } catch (error) {
    return res.status(403).json({ error });
  }
});

//update password through otp
userRoutes.put("/user/forgot-pssword", async (req, res) => {});

export default userRoutes;
