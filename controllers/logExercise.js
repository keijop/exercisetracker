const Exercise = require('../models/Exercise.js')
const User = require('../models/User')
const filter = require('../utils/objectFilter.js')

const logExercise = async (req,res) => {

	try{ 
		//create obj and check if date is null, if null delete date prop 
		const reqBody = Object.assign({}, req.body)
		!reqBody.date ? delete reqBody.date : ''
		
		//pass obj to Exercise.create
		const user = await User.findById(reqBody[':_id'])
		reqBody.username = user.username
		const newExercise = await Exercise.create(reqBody)

		//filter out props not being sent in response
		const filteredUser = filter(user, ['_id', 'username'])
		const filteredExercise = filter(newExercise, ['date', 'description', 'duration'])
		const responseObj = Object.assign(filteredUser, filteredExercise)

		
		return res.json(responseObj)
	}catch(error){
		res.json({errorMsg : error.message})
	}
}

module.exports = logExercise