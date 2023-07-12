const mongoose = require('mongoose')

const BrandSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		link: { type: String, required: true },
		image: { type: String, required: true }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Brand', BrandSchema)
