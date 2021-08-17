const User = require('../models/User')

const getUsers = async (req,res) => {
  	try {
  		// find all users
	    let userList = await User.find({})
	    //map over users list and return user with only username and id 
		userList = userList.map( user => {
  		const {_id, username} = user
  		return {username : username, _id : _id}
		})
		res.status(201).send(userList)
 	} catch (error) {
 		console.error(error.stack)
  		res.status(404).json({error : 'Something went wrong', errorMsg : error.message})
  }
}

module.exports = getUsers