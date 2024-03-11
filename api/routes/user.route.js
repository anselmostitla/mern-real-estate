import express from "express";
const router = express.Router();

import { deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.route("/")
   .get(getUsers);  

router.route("/update/:id").put(verifyToken, updateUser);

router.route("/delete/:id").delete(verifyToken, deleteUser);    

export default router;
