const User = require('../models/User')

const createUser = async (req,res) => {

	const {username} = req.body
  	console.log('user hit server')
  	try {
	    const newUser = await User.create({username : username})
	    res.status(201).json({username : newUser.username, _id : newUser._id})
 	} catch (err) {
  		res.status(404).json({errorMsg : err})
  }
}

module.exports = createUser