const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	userId : {
		type : String,
		required : true
	},
	duration : {
		type : Number,
		required : [true, 'Duration is required']
	},
		description : {
		type : String,
		required : [true, 'Description is required']
	},
	date : {
		type : Date,
		default : new Date()
	}
})

module.exports = mongoose.model('Exercise', exerciseSchema)