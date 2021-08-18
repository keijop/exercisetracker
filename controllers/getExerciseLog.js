const Exercise = require('../models/Exercise.js')
const User = require('../models/User')


const getExerciseLog = async (req,res) => {

	const { _id } = req.params
	
	const user = await User.findById(_id)
	let exerciseLog = await Exercise.find({userId : _id})

	exerciseLog = exerciseLog.map( obj => {
		const {userId, _id, __v, ...rest} = obj._doc
		rest.date = rest.date.toDateString()
		return rest
	})

	const result = Object.assign({}, user._doc)
	result.count = exerciseLog.length
	result.log = exerciseLog
	
	


	res.json(result)
}

module.exports = getExerciseLog