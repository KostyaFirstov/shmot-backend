const Category = require('../models/Category')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newCategory = new Category(req.body)

	try {
		const savedCategory = await newCategory.save()
		res.status(200).json(savedCategory)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedCategory = await Category.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedCategory)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Category.findByIdAndDelete(req.params.id)
		res.status(200).json('Категория была удалёна...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET CATEGORY

router.get('/:title', async (req, res) => {
	try {
		const category = await Category.find({ name: req.params.title })
		res.status(200).json(category)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL CATEGORY LIST

router.get('/', async (req, res) => {
	try {
		const category = await Category.find()
		res.status(200).json(category)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
