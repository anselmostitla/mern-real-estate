import express from 'express'
const router = express.Router()

import { signup, signin, google, signOut } from '../controllers/auth.controller.js'

router.route('/signup')
   .post(signup)

router.route('/signin')
   .post(signin)

router.route('/google')
   .post(google)

router.route('/signout')
   .get(signOut)


export default router
