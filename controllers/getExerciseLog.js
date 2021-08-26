const Exercise = require('../models/Exercise.js')
const User = require('../models/User')
const filter = require('../utils/objectFilter.js')
const queryFilterConstructor = require('../utils/queryFilterConstructor.js')

const getExerciseLog = async (req,res) => {

	try	{	
		const { _id } = req.params
		const user = await User.findById(_id)

		if(!user){
			return res.status(404).json({error : `User with id ${_id} does not exist!`})
		}

		//find exercises with helper function that checks for the query string
		//chain: limit the amount of matches returned
		let exerciseLog = await Exercise.find(
			queryFilterConstructor(user.username, req.query))
			.limit(Number(req.query.limit))

		//map over the exercises and format date and remove unwanted props with custom filter func
		exerciseLog = exerciseLog.map( obj => {
			const filteredObj = filter(obj, ['date', 'description', 'duration'])
			filteredObj.date = filteredObj.date.toDateString()
			return filteredObj
		})

		//remove unwanted props from user
		//add count and log props
		const filteredUser = filter(user, ['_id', 'username'])
		filteredUser.count = exerciseLog.length
		filteredUser.log = exerciseLog
		
		res.status(200).json(filteredUser)

	} catch (err){
		res.status(404).json({error : err.message})
	  }
}

module.exports = getExerciseLog