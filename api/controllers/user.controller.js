import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs'

export const getUser = (req, res) => {
  console.log(" get out of here please");
  res.status(200).json("testing get out of control for one or two but no more than three");
};

export const updateUser = async (req, res, next) => {
  
  if(req.user.id != req.params.id) return next(errorHandler(403, "You can only update your own account"))

  try {
    if (req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, {new: true})

    const {password, ...restUserInfo} = updatedUser._doc

    res.status(200).json(restUserInfo)
  } catch (error) {
    next(error)
  }

}