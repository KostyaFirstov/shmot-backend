const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String, required: true },
		text: { type: String, required: true },
		img: { type: Array, required: true },
		categories: { type: Array },
		sizes: { type: Array, required: true },
		color: { type: String },
		brand: { type: String, required: true },
		price: { type: Number, required: true },
		gender: { type: Array, required: true },
		amount: { type: Number, required: true },
		popular: { type: Number, required: true }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
