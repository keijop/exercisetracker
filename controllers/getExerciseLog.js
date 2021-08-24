const Exercise = require('../models/Exercise.js')
const User = require('../models/User')
const filter = require('../utils/objectFilter.js')


const getExerciseLog = async (req,res) => {
	console.log(req.query)
	console.log(req.params)

try	{	const { _id } = req.params
		
		const user = await User.findById(_id)

		if(!user){
			return res.status(404).json({error : `User with id ${_id} does not exist!`})
		}

		let exerciseLog = await Exercise.find({username : user.username})



		exerciseLog = exerciseLog.map( obj => {
			const {_id, __v, username, ...rest} = obj._doc
			rest.date = rest.date.toDateString()
			return rest
		})

		const result = filter(user, ['_id', 'username'])
		result.count = exerciseLog.length
		result.log = exerciseLog
		
		res.status(200).json(result)
	} catch (err){
		res.status(404).json({error : err.message})
	}
}

module.exports = getExerciseLog