import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async(req, res, next) => {
   const {username, email, password } = req.body
   let msg = {}

   if(password.length<8) {
      msg.password = 'password must be at least 8 characters'
   }
   
   
   const hashedPassword = bcryptjs.hashSync(password, 10) 
   try {
      if( await User.findOne({username})){
         msg.username = 'username already in use'
      }
      if( await User.findOne({email})){
         msg.email = 'email already in use'
      }
      if(msg.password || msg.username || msg.email) return res.status(400).json({message: msg})

      const newUser = await User.create({username, email, password:hashedPassword})  
      res.status(201).json('User created successfully')  
   } catch (error) {
      next(error) 
   }

}

