import express from "express";
const router = express.Router()

import { getUser } from "../controlers/user.control.js";



router.route('/')
   .get(getUser)



export default router
