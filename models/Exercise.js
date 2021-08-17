const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	description : {
		type : String,
		required : [true, 'Description is required']
	},
	duration : {
		type : Number,
		required : [true, 'Duration is required']
	},
	date : {
		type : Date,
		default : new Date().toDateString()
	}
})

module.exports = mongoose.model('Exercise', exerciseSchema)