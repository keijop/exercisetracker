const Exercise = require('../models/Exercise.js')
const User = require('../models/User')

const logExercise = async (req,res) => {
	try{ 
		//create obj and check if date is null, if null delete date prop 
		const reqBody = Object.assign({}, req.body)
		!reqBody.date ? delete reqBody.date : ''
		
		//pass obj to Exercise.create
		const newExercise = await Exercise.create(reqBody)
		const user = await User.findById(reqBody[':_id'])

		//Object.assign(user, newExercise)


		// create new user obj where __v prop is omitted
		// create new exerc obj where __v and _id props are omitted
		// clone both obj into new obj and format date 
		const { __v, ...userDataObj } = user._doc
		const { __v : v, _id, ...exerciseDataObj } = newExercise._doc
		const exerciseLogObj = Object.assign(userDataObj, exerciseDataObj)

		exerciseLogObj.date = exerciseLogObj.date.toDateString()
		
		return res.json(exerciseLogObj)
	}catch(error){
		res.json({errorMsg : error.message})
	}
}

module.exports = logExercise