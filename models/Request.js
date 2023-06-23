const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		popular: { type: Number, default: 0 },
		isApproved: { type: Boolean, default: false }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Request', RequestSchema)
