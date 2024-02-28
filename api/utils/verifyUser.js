import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // In order to get data from cookie we need to install in the backend
  // npm i cookie-parser
  const token = req.cookies["access token"];
  console.log("token: ", token)
  if (!token) {
    next(errorHandler(401, "Unauthorize"));
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, user) => {
      if (err) return errorHandler(403, "Forbidden");
      req.user = user
      next()
    }
  );
};
