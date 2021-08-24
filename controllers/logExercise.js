const Exercise = require('../models/Exercise.js')
const User = require('../models/User')
const filter = require('../utils/objectFilter.js')

const logExercise = async (req,res) => {
	

	try{ 
		//create obj and check if date is null, if null delete date prop 
		const reqBody = Object.assign({}, req.body)
		
		

		!reqBody.date ? delete reqBody.date : ''
		
		
		//pass obj to Exercise.create
		const user = await User.findById(req.params)
		reqBody.username = user.username
		const newExercise = await Exercise.create(reqBody)
		

		//filter out props not being sent in response
		const filteredUser = filter(user, ['_id', 'username'])
		const filteredExercise = filter(newExercise, ['date', 'description', 'duration'])
		const responseObj = Object.assign(filteredUser, filteredExercise)
		responseObj.date = responseObj.date.toDateString()

		
		return res.status(201).json(responseObj)
	}catch(error){
		res.status(500).json({errorMsg : error.message})
	}
	
}

module.exports = logExercise