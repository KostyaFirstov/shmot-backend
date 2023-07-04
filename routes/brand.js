const Brand = require('../models/Brand')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newBrand = new Brand(req.body)

	try {
		const savedBrand = await newBrand.save()
		res.status(200).json(savedBrand)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedBrand = await Brand.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedBrand)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Brand.findByIdAndDelete(req.params.id)
		res.status(200).json('Бренд был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET BRAND

router.get('/:title', async (req, res) => {
	try {
		const brand = await Brand.find({ link: req.params.title })
		res.status(200).json(brand)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL BRANDS LIST

router.get('/', async (req, res) => {
	try {
		const brand = await Brand.find()
		res.status(200).json(brand)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
