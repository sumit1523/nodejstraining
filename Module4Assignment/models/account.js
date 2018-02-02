const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
	name: String,
	balance: Number
})

module.exports.Account = mongoose.model('Account', accountSchema)