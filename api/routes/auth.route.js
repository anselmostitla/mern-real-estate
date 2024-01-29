import express from 'express'
const router = express.Router()

import { signup } from '../controllers/auth.controller.js'

router.route('/signup')
   .post(signup)


export default router
