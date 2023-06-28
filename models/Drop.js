const mongoose = require('mongoose')

const DropSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String, required: true },
		text: { type: String, required: true },
		date: { type: String, required: true },
		img: { type: Array, required: true },
		viewsCount: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Drop', DropSchema)
