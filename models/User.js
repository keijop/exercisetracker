const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username : {
		type: String,
		required : true,
		trim: true,
		maxlength: [20, 'Maximum length is 20 characters'],
		minlength: [5, 'Minimum length is 5 characters']
	}
})

module.exports = mongoose.model('User', userSchema)