const User = require('../models/User')

const createUser = async (req,res) => {

	const {username} = req.body
  	
  	try {
  		//check if username already exist in db
  		//send error msg if exists or create new user if doesn't
  		const user = await User.findOne({username : username})
  		if(user){
  			return res.status(200).json({error : 'Username already in use'})
  		}
	    const newUser = await User.create({username : username})
	    res.status(201).json({username : newUser.username, _id : newUser._id})
 	} catch (err) {
  		res.status(500).json({errorMsg : err})
  }
}

module.exports = createUser